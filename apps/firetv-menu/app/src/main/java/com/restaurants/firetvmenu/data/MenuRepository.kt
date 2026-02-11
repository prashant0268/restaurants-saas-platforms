package com.restaurants.firetvmenu.data

import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ListenerRegistration
import com.restaurants.firetvmenu.model.DisplayConfig
import com.restaurants.firetvmenu.model.MenuCategory
import com.restaurants.firetvmenu.model.MenuItem
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

class MenuRepository {

    private val db = FirebaseFirestore.getInstance()

    fun getCategories(restaurantId: String): Flow<List<MenuCategory>> = callbackFlow {
        val listener: ListenerRegistration = db
            .collection("restaurants")
            .document(restaurantId)
            .collection("menuCategories")
            .whereEqualTo("isActive", true)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                val categories = snapshot?.documents?.mapNotNull { doc ->
                    doc.toObject(MenuCategory::class.java)?.copy(id = doc.id)
                }?.sortedBy { it.sortOrder } ?: emptyList()
                trySend(categories)
            }

        awaitClose { listener.remove() }
    }

    fun getMenuItems(restaurantId: String): Flow<List<MenuItem>> = callbackFlow {
        val listener: ListenerRegistration = db
            .collection("restaurants")
            .document(restaurantId)
            .collection("menuItems")
            .whereEqualTo("isAvailable", true)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                val items = snapshot?.documents?.mapNotNull { doc ->
                    doc.toObject(MenuItem::class.java)?.copy(id = doc.id)
                }?.sortedBy { it.sortOrder } ?: emptyList()
                trySend(items)
            }

        awaitClose { listener.remove() }
    }

    fun getDisplayConfig(restaurantId: String): Flow<DisplayConfig?> = callbackFlow {
        val listener: ListenerRegistration = db
            .collection("fireTvDisplays")
            .whereEqualTo("restaurantId", restaurantId)
            .limit(1)
            .addSnapshotListener { snapshot, error ->
                if (error != null) {
                    close(error)
                    return@addSnapshotListener
                }
                val config = snapshot?.documents?.firstOrNull()
                    ?.toObject(DisplayConfig::class.java)
                trySend(config)
            }

        awaitClose { listener.remove() }
    }
}
