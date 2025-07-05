import type { MainMenuItem, MenuNavigation } from "~/types";

export const menuMain: MainMenuItem[] = [
  {
    id: "home",
    label: "Home",
    url: "/",
  },
  {
    id: "destinations",
    label: "Destinations",
    url: "/destinations",
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
    ],
  },
  {
    id: "services",
    label: "Services",
    url: "/services",
    submenu: [
      { id: "tours", label: "Guided Tours", url: "/services/tours" },
      {
        id: "accommodation",
        label: "Accommodation",
        url: "/services/accommodation",
      },
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
      name: "Destinations",
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
      name: "Guided Tours",
      url: "/services/tours",
    },
    {
      name: "Accommodation",
      url: "/services/accommodation",
    },
    {
      name: "Transportation",
      url: "/services/transportation",
    },
    {
      name: "Travel Planning",
      url: "/services/travel-planning",
    },
  ],
};

export const menuDestinations: MenuNavigation = {
  prettyName: "Popular Destinations",
  items: [
    {
      name: "Beach Resorts",
      url: "/destinations/beach-resorts",
    },
    {
      name: "Mountain Adventures",
      url: "/destinations/mountains",
    },
    {
      name: "Cultural Cities",
      url: "/destinations/cultural-cities",
    },
    {
      name: "Nature Parks",
      url: "/destinations/nature-parks",
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
