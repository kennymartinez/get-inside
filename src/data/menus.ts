import type { MainMenuItem, MenuNavigation } from "~/types";

export const menuMain: MainMenuItem[] = [
  {
    id: "home",
    label: "Home",
    url: "/",
  },
  {
    id: "tours",
    label: "Tours",
    url: "/tours",
  },
  {
    id: "medical",
    label: "Medical Tourism",
    url: "/medical",
    submenu: [
      {
        id: "cosmetic-surgery",
        label: "Cosmetic Surgery",
        url: "/medical/specialty/cosmetic-surgery",
      },
      {
        id: "dentistry",
        label: "Dentistry",
        url: "/medical/specialty/dentistry",
      },
      {
        id: "bariatric-surgery",
        label: "Bariatric Surgery",
        url: "/medical/specialty/bariatric-surgery",
      },
      {
        id: "orthopedics",
        label: "Orthopedics",
        url: "/medical/specialty/orthopedics",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    url: "/services",
    submenu: [
      { id: "tours", label: "Guided Tours", url: "/services/tours" },
      {
        id: "transportation",
        label: "Transportation",
        url: "/services/transportation",
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
      name: "Tours",
      url: "/tours",
    },
    {
      name: "Medical Tourism",
      url: "/medical",
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
      name: "Guided Tours",
      url: "/services/tours",
    },
    {
      name: "Transportation",
      url: "/services/transportation",
    },
    {
      name: "Medical Tourism",
      url: "/medical",
    },
  ],
};

// NEW: Medical Tourism specific menu for footer or other uses
export const menuMedical: MenuNavigation = {
  prettyName: "Medical Specialties",
  items: [
    {
      name: "Cosmetic Surgery",
      url: "/medical/specialty/cosmetic-surgery",
    },
    {
      name: "Dentistry",
      url: "/medical/specialty/dentistry",
    },
    {
      name: "Bariatric Surgery",
      url: "/medical/specialty/bariatric-surgery",
    },
    {
      name: "Orthopedics",
      url: "/medical/specialty/orthopedics",
    },
    {
      name: "Ophthalmology",
      url: "/medical/specialty/ophthalmology",
    },
    {
      name: "Cardiology",
      url: "/medical/specialty/cardiology",
    },
    {
      name: "Dermatology",
      url: "/medical/specialty/dermatology",
    },
    {
      name: "Fertility Treatment",
      url: "/medical/specialty/fertility-treatment",
    },
  ],
};

export const menuLegal: MenuNavigation = {
  prettyName: "Legal",
  items: [
    {
      name: "Terms of Service",
      url: "/legal/terms",
    },
    {
      name: "Privacy Policy",
      url: "/legal/privacy",
    },
    {
      name: "Booking Policy",
      url: "/legal/booking-policy",
    },
    {
      name: "Travel Insurance",
      url: "/legal/travel-insurance",
    },
  ],
};
