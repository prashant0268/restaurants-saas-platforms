package com.restaurants.firetvmenu.ui.menu

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.restaurants.firetvmenu.data.MenuRepository
import com.restaurants.firetvmenu.model.DisplayConfig
import com.restaurants.firetvmenu.model.MenuCategory
import com.restaurants.firetvmenu.model.MenuItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class MenuViewModel : ViewModel() {

    private val repository = MenuRepository()

    private val _categories = MutableStateFlow<List<MenuCategory>>(emptyList())
    val categories: StateFlow<List<MenuCategory>> = _categories.asStateFlow()

    private val _menuItems = MutableStateFlow<List<MenuItem>>(emptyList())
    val menuItems: StateFlow<List<MenuItem>> = _menuItems.asStateFlow()

    private val _displayConfig = MutableStateFlow<DisplayConfig?>(null)
    val displayConfig: StateFlow<DisplayConfig?> = _displayConfig.asStateFlow()

    private val _selectedCategoryId = MutableStateFlow<String?>(null)
    val selectedCategoryId: StateFlow<String?> = _selectedCategoryId.asStateFlow()

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    // TODO: Get from device registration or settings
    private val restaurantId = "demo-restaurant"

    init {
        loadData()
    }

    private fun loadData() {
        viewModelScope.launch {
            repository.getCategories(restaurantId).collect { cats ->
                _categories.value = cats
                _isLoading.value = false
            }
        }
        viewModelScope.launch {
            repository.getMenuItems(restaurantId).collect { items ->
                _menuItems.value = items
            }
        }
        viewModelScope.launch {
            repository.getDisplayConfig(restaurantId).collect { config ->
                _displayConfig.value = config
            }
        }
    }

    fun selectCategory(categoryId: String?) {
        _selectedCategoryId.value = categoryId
    }

    fun getFilteredItems(): List<MenuItem> {
        val catId = _selectedCategoryId.value
        return if (catId == null) {
            _menuItems.value
        } else {
            _menuItems.value.filter { it.categoryId == catId }
        }
    }
}
