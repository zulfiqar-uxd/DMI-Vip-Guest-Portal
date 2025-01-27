import { useState, useEffect } from "react";
import Header from "@/components/Header";
import GeneralUtils from "@/utils/GeneralUtils";

const CafeOrder = () => {
  const { language, toggleLanguage } = GeneralUtils();

  // Categories and Filters Translations
  const categories = {
    en: ["Coffee", "Tea", "Juice", "Water"],
    ar: ["قهوة", "شاي", "عصير", "ماء"],
  };

  // Product Data
  const products = [
    // Coffee
    {
      id: 1,
      category: "Coffee",
      name: { en: "Arabic Coffee", ar: "القهوة العربية" },
      description: {
        en: "Traditional Arabic coffee flavored with cardamom.",
        ar: "القهوة العربية التقليدية بنكهة الهيل.",
      },
      image: "/images/coffee.png",
    },
    {
      id: 2,
      category: "Coffee",
      name: { en: "Flat White", ar: "فلات وايت" },
      description: {
        en: "Smooth espresso with velvety steamed milk.",
        ar: "إسبريسو ناعم مع حليب مخملي مبخر.",
      },
      image: "/images/coffee.png",
    },
    {
      id: 3,
      category: "Coffee",
      name: { en: "Cappuccino", ar: "كابتشينو" },
      description: {
        en: "Espresso with steamed milk and foam topped with cocoa.",
        ar: "إسبريسو مع حليب مبخر ورغوة مغطاة بالكاكاو.",
      },
      image: "/images/coffee.png",
    },
    {
      id: 4,
      category: "Coffee",
      name: { en: "Latte", ar: "لاتيه" },
      description: {
        en: "Espresso with steamed milk and a touch of foam.",
        ar: "إسبريسو مع الحليب المبخر ولمسة من الرغوة.",
      },
      image: "/images/coffee.png",
    },
    {
      id: 5,
      category: "Coffee",
      name: { en: "Hot Chocolate", ar: "شوكولاتة ساخنة" },
      description: {
        en: "Rich and creamy hot chocolate drink.",
        ar: "مشروب شوكولاتة ساخنة غني ودسم.",
      },
      image: "/images/coffee.png",
    },

    // Tea
    {
      id: 6,
      category: "Tea",
      name: { en: "Red Tea", ar: "شاي أحمر" },
      description: {
        en: "Strong and flavorful red tea.",
        ar: "شاي أحمر قوي ولذيذ.",
      },
      image: "/images/tea.png",
    },
    {
      id: 7,
      category: "Tea",
      name: { en: "Green Tea", ar: "شاي أخضر" },
      description: {
        en: "Refreshing and healthy green tea.",
        ar: "شاي أخضر منعش وصحي.",
      },
      image: "/images/tea.png",
    },
    {
      id: 8,
      category: "Tea",
      name: { en: "Jasmine Tea", ar: "شاي الياسمين" },
      description: {
        en: "Aromatic tea infused with jasmine flowers.",
        ar: "شاي عطري مملوء بزهور الياسمين.",
      },
      image: "/images/tea.png",
    },

    // Juice
    {
      id: 9,
      category: "Juice",
      name: { en: "Orange Juice", ar: "عصير البرتقال" },
      description: {
        en: "Freshly squeezed orange juice.",
        ar: "عصير البرتقال الطازج.",
      },
      image: "/images/orange.png",
    },
    {
      id: 10,
      category: "Juice",
      name: { en: "Apple Juice", ar: "عصير التفاح" },
      description: {
        en: "Sweet and crisp apple juice.",
        ar: "عصير تفاح حلو ومقرمش.",
      },
      image: "/images/apple.png",
    },
    {
      id: 11,
      category: "Juice",
      name: { en: "Lemonade", ar: "ليموناضة" },
      description: {
        en: "Fresh and tangy lemonade.",
        ar: "ليموناضة منعشة وحامضة.",
      },
      image: "/images/lemonade.png",
    },

    // Water
    {
      id: 12,
      category: "Water",
      name: { en: "Still Water", ar: "مياه عادية" },
      description: {
        en: "Pure and refreshing still water.",
        ar: "مياه نقية ومنعشة.",
      },
      image: "/images/still-water.png",
    },
    {
      id: 13,
      category: "Water",
      name: { en: "Sparkling Water", ar: "مياه فوارة" },
      description: {
        en: "Lightly carbonated refreshing water.",
        ar: "مياه فوارة منعشة قليلاً.",
      },
      image: "/images/sparkling-water.png",
    },
  ];

  const currentFilters = categories[language];
  const currentCategories = categories[language];

  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setFilteredProducts(products);
    } else {
      setActiveFilter(filter);
      setFilteredProducts(
        products.filter((product) =>
          product.category.includes(
            categories.en[categories[language].indexOf(filter)]
          )
        )
      );
    }
  };

  return (
    <div className="bg-[#FFFAF4]">
      <Header language={language} onLanguageToggle={toggleLanguage} />
      <main className="px-8 md:px-24 p-6">
        {/* Breadcrumbs */}
        <div
          className="flex items-center gap-2 mb-8"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <a href="/" className="text-dmiRed1 font-medium hover:underline">
            {language === "ar" ? "الرئيسية" : "Home"}
          </a>
          <span className="text-gray-500">{language === "ar" ? ">" : ">"}</span>
          <span className="text-gray-500 font-medium">
            {language === "ar" ? "طلب المقهى" : "Cafe Order"}
          </span>
        </div>

        {/* Filters */}
        <div
          className="flex gap-4 overflow-x-auto mb-12 hideScrollbar"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {currentFilters.map((filter, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(categories.en[index])}
              className={`px-4 py-2 border border-transparent rounded-full text-nowrap text-sm font-medium ${
                activeFilter === categories.en[index]
                  ? "bg-dmiRed2 text-white"
                  : "text-dmiRed1 bg-red-100 hover:border-dmiRed1 hover:bg-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grouped Products */}
        {currentCategories.map((category, index) => {
          const categoryProducts = filteredProducts.filter(
            (product) => product.category === categories.en[index]
          );
          return categoryProducts.length > 0 ? (
            <div key={index} className="">
              <h2
                className={`text-3xl font-bold text-neutral-700 mb-5`}
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border border-dmiRed1 rounded-lg bg-white shadow-md"
                  >
                    <div className="w-full h-[180px] bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name[language]}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        className="px-1 py-1 bg-dmiRed1 rounded-full shadow absolute bottom-4 right-4 w-8 h-8 border border-transparent flex items-center justify-center group hover:scale-125 active:border-white"
                        aria-label="Add to cart"
                      >
                        <img
                          src="/icons/plus.svg"
                          alt="Add"
                          className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-500"
                        />
                      </button>
                    </div>

                    <h3
                      className="text-lg font-semibold"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      {product.name[language]}
                    </h3>
                    <p
                      className="text-sm text-gray-500"
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      {product.description[language]}
                    </p>
                  </div>
                ))}
              </div>
              <hr className="my-12 border-gray-300" />
            </div>
          ) : null;
        })}
      </main>
    </div>
  );
};

export default CafeOrder;
