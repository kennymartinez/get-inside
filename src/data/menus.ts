import type { MainMenuItem, MenuNavigation } from "~/types";

export const menuMain: MainMenuItem[] = [
  {
    id: "home",
    label: "Home",
    url: "/",
  },
  {
    id: "tours", // Changed from "cars"
    label: "Tours",
    url: "/tours",
    submenu: [
      { id: "all-tours", label: "All Tours", url: "/tours" },
      { id: "destinations", label: "Destinations", url: "/destinations" },
      {
        id: "adventure",
        label: "Adventure Tours",
        url: "/tours?tourType=Adventure",
      },
      {
        id: "cultural",
        label: "Cultural Tours",
        url: "/tours?tourType=Cultural",
      },
      { id: "nature", label: "Nature Tours", url: "/tours?tourType=Nature" },
    ],
  },
  {
    id: "about",
    label: "About",
    url: "/about-us",
    submenu: [
      {
        id: "testimonials",
        label: "Testimonials",
        url: "/about-us/testimonials",
      },
      { id: "our-team", label: "Our Team", url: "/about-us/team" },
    ],
  },
  {
    id: "services",
    label: "Services",
    url: "/services",
    submenu: [
      {
        id: "tour-planning",
        label: "Tour Planning",
        url: "/services/tour-planning",
      },
      {
        id: "transportation",
        label: "Transportation",
        url: "/services/transportation",
      },
      {
        id: "accommodation",
        label: "Accommodation",
        url: "/services/accommodation",
      },
      {
        id: "travel-insurance",
        label: "Travel Insurance",
        url: "/services/travel-insurance",
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    url: "/blog",
  },
];

export const menuNavigation: MenuNavigation = {
  prettyName: "Navigation",
  items: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Tours", // Changed from "Cars"
      url: "/tours",
    },
    {
      name: "Destinations", // Changed from "Makes"
      url: "/destinations",
    },
    {
      name: "About Us",
      url: "/about-us",
    },
    {
      name: "Services",
      url: "/services",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ],
};

export const menuService: MenuNavigation = {
  prettyName: "Services",
  items: [
    {
      name: "Tour Planning",
      url: "/services/tour-planning",
    },
    {
      name: "Transportation",
      url: "/services/transportation",
    },
    {
      name: "Accommodation",
      url: "/services/accommodation",
    },
    {
      name: "Travel Insurance",
      url: "/services/travel-insurance",
    },
    {
      name: "Group Bookings",
      url: "/services/group-bookings",
    },
    {
      name: "Custom Tours",
      url: "/services/custom-tours",
    },
  ],
};

export const menuDestinations: MenuNavigation = {
  prettyName: "Popular Destinations",
  items: [
    {
      name: "Cartagena",
      url: "/tours?destination=Cartagena",
    },
    {
      name: "Medellín",
      url: "/tours?destination=Medellín",
    },
    {
      name: "Amazon",
      url: "/tours?destination=Amazon",
    },
    {
      name: "Coffee Region",
      url: "/tours?destination=Coffee Region",
    },
    {
      name: "Tayrona",
      url: "/tours?destination=Tayrona",
    },
    {
      name: "All Destinations",
      url: "/destinations",
    },
  ],
};

export const menuTourTypes: MenuNavigation = {
  prettyName: "Tour Types",
  items: [
    {
      name: "Adventure Tours",
      url: "/tours?tourType=Adventure",
    },
    {
      name: "Cultural Tours",
      url: "/tours?tourType=Cultural",
    },
    {
      name: "Nature Tours",
      url: "/tours?tourType=Nature",
    },
    {
      name: "Beach Tours",
      url: "/tours?tourType=Beach",
    },
    {
      name: "City Tours",
      url: "/tours?tourType=Urban",
    },
    {
      name: "Food Tours",
      url: "/tours?tourType=Gastronomic",
    },
  ],
};

// Legacy menus (keep for backward compatibility)
export const menuMisc: MenuNavigation = {
  prettyName: "Miscellaneous",
  items: [
    {
      name: "Privacy Policy",
      url: "/privacy",
    },
    {
      name: "Terms of Service",
      url: "/terms",
    },
    {
      name: "Contact Us",
      url: "/contact",
    },
    {
      name: "FAQ",
      url: "/faq",
    },
    {
      name: "Travel Tips",
      url: "/blog/category/tips",
    },
    {
      name: "Safety Guidelines",
      url: "/safety",
    },
  ],
};

export const menuLegal: MenuNavigation = {
  prettyName: "Legal",
  items: [
    {
      name: "Terms & Conditions",
      url: "/terms",
    },
    {
      name: "Privacy Policy",
      url: "/privacy",
    },
    {
      name: "Cancellation Policy",
      url: "/cancellation-policy",
    },
    {
      name: "Booking Terms",
      url: "/booking-terms",
    },
    {
      name: "Travel Insurance",
      url: "/travel-insurance",
    },
    {
      name: "Safety Guidelines",
      url: "/safety",
    },
  ],
};
