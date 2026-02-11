package com.restaurants.firetvmenu.model

data class MenuItem(
    val id: String = "",
    val name: String = "",
    val description: String = "",
    val price: Double = 0.0,
    val currency: String = "USD",
    val categoryId: String = "",
    val imageUrl: String? = null,
    val isAvailable: Boolean = true,
    val isPopular: Boolean = false,
    val isNew: Boolean = false,
    val tags: List<String> = emptyList(),
    val allergens: List<String> = emptyList(),
    val calories: Int? = null,
    val isVegetarian: Boolean = false,
    val isVegan: Boolean = false,
    val isGlutenFree: Boolean = false,
    val spiceLevel: Int = 0,
    val sortOrder: Int = 0,
)

data class MenuCategory(
    val id: String = "",
    val name: String = "",
    val description: String? = null,
    val imageUrl: String? = null,
    val sortOrder: Int = 0,
    val isActive: Boolean = true,
)

data class DisplayConfig(
    val id: String = "",
    val restaurantId: String = "",
    val layout: String = "grid",  // grid, list, featured, slideshow
    val backgroundColor: String = "#1A1A2E",
    val textColor: String = "#FAFAFA",
    val accentColor: String = "#FF6B35",
    val showPrices: Boolean = true,
    val showImages: Boolean = true,
    val showQrCode: Boolean = true,
    val qrCodeUrl: String? = null,
    val rotationInterval: Int = 15,  // seconds
    val showCategories: List<String> = emptyList(),
)
