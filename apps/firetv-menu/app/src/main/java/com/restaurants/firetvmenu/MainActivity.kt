package com.restaurants.firetvmenu

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.KeyEvent
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import com.restaurants.firetvmenu.ui.menu.MenuViewModel
import kotlinx.coroutines.launch

/**
 * Main activity for Fire TV Digital Menu Board.
 *
 * Displays restaurant menu items in a fullscreen grid/list layout
 * optimized for TV displays. Syncs with Firestore in real-time
 * for live price and availability updates.
 *
 * Remote control navigation:
 * - D-pad: Navigate between menu items and categories
 * - Menu button: Open settings
 * - Back: Return to previous category or exit
 */
class MainActivity : AppCompatActivity() {

    private lateinit var viewModel: MenuViewModel
    private val autoRotateHandler = Handler(Looper.getMainLooper())
    private var isAutoRotating = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        viewModel = ViewModelProvider(this)[MenuViewModel::class.java]

        // Build UI programmatically for now (ViewBinding layout to be added)
        val rootLayout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(0xFF1A1A2E.toInt())
            setPadding(48, 32, 48, 32)
        }

        // Header
        val header = TextView(this).apply {
            text = "Digital Menu Board"
            textSize = 32f
            setTextColor(0xFFFF6B35.toInt())
            setPadding(0, 0, 0, 24)
        }
        rootLayout.addView(header)

        // Status text
        val statusText = TextView(this).apply {
            text = "Loading menu..."
            textSize = 20f
            setTextColor(0xFFA3A3A3.toInt())
        }
        rootLayout.addView(statusText)

        // Category tabs placeholder
        val categoryRow = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, 16, 0, 16)
        }
        rootLayout.addView(categoryRow)

        // Menu items area placeholder
        val menuArea = TextView(this).apply {
            text = "Menu items will appear here\n\nCategories | Item Grid with Images & Prices | QR Code"
            textSize = 18f
            setTextColor(0xFFFAFAFA.toInt())
            setPadding(0, 32, 0, 0)
        }
        rootLayout.addView(menuArea)

        setContentView(rootLayout)

        // Observe data
        lifecycleScope.launch {
            viewModel.categories.collect { categories ->
                categoryRow.removeAllViews()
                // Add "All" tab
                categoryRow.addView(createCategoryTab("All", null))
                categories.forEach { cat ->
                    categoryRow.addView(createCategoryTab(cat.name, cat.id))
                }
            }
        }

        lifecycleScope.launch {
            viewModel.menuItems.collect { items ->
                if (items.isNotEmpty()) {
                    statusText.text = "${items.size} items loaded"
                    menuArea.text = items.joinToString("\n") { item ->
                        "${item.name} - $${String.format("%.2f", item.price)}${if (!item.isAvailable) " (Unavailable)" else ""}"
                    }
                }
            }
        }

        lifecycleScope.launch {
            viewModel.isLoading.collect { loading ->
                if (loading) {
                    statusText.text = "Loading menu..."
                } else if (viewModel.menuItems.value.isEmpty()) {
                    statusText.text = "No menu items available"
                }
            }
        }

        startAutoRotation()
    }

    private fun createCategoryTab(name: String, categoryId: String?): TextView {
        return TextView(this).apply {
            text = name
            textSize = 18f
            setTextColor(0xFFFAFAFA.toInt())
            setPadding(24, 12, 24, 12)
            isFocusable = true
            isFocusableInTouchMode = true
            setOnClickListener {
                viewModel.selectCategory(categoryId)
            }
            setOnFocusChangeListener { _, hasFocus ->
                setBackgroundColor(if (hasFocus) 0xFFFF6B35.toInt() else 0x00000000)
            }
        }
    }

    private fun startAutoRotation() {
        val config = viewModel.displayConfig.value
        val interval = (config?.rotationInterval ?: 15) * 1000L

        autoRotateHandler.postDelayed(object : Runnable {
            override fun run() {
                if (isAutoRotating) {
                    val categories = viewModel.categories.value
                    if (categories.isNotEmpty()) {
                        val currentIdx = categories.indexOfFirst { it.id == viewModel.selectedCategoryId.value }
                        val nextIdx = (currentIdx + 1) % (categories.size + 1) // +1 for "All"
                        val nextCatId = if (nextIdx == 0) null else categories[nextIdx - 1].id
                        viewModel.selectCategory(nextCatId)
                    }
                    autoRotateHandler.postDelayed(this, interval)
                }
            }
        }, interval)
    }

    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        // Pause auto-rotation on any key press, resume after 30 seconds
        isAutoRotating = false
        autoRotateHandler.postDelayed({ isAutoRotating = true }, 30000)

        return when (keyCode) {
            KeyEvent.KEYCODE_MENU -> {
                // TODO: Open settings overlay
                true
            }
            else -> super.onKeyDown(keyCode, event)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        autoRotateHandler.removeCallbacksAndMessages(null)
    }
}
