import type { CollectionEntry } from "astro:content";
import { colorClasses } from "./components/CardGridAlt.astro";
import { pillColors } from "./components/Pill.astro";

// Main collection types updated for tourism
export type Blog = CollectionEntry<"blog">;
export type Tour = CollectionEntry<"tours">; // Changed from Car to Tour
export type Testimonial = CollectionEntry<"testimonials">;
export type Team = CollectionEntry<"team">;

// Legacy type alias for compatibility during migration
export type Car = Tour; // Temporary alias to prevent breaking changes

// Base component interfaces (unchanged)
export interface ClassNameProps {
  class?: string;
}

export interface ArticleProps {
  contain?: boolean;
}

export interface ButtonProps extends ClassNameProps {
  color?: string;
  href?: string;
  newtab?: boolean;
  As?: "a" | "button";
  type?: "button" | "submit" | "reset";
}

export interface CardBlogPost {
  post: Blog;
  index: number;
}

export interface CardGridAltProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  color: keyof typeof colorClasses;
}

export interface ContainerProps extends ClassNameProps {
  contain?: boolean;
}

export interface FaqProps extends ClassNameProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export interface FilterBarMobileProps {
  params: [string, string][];
}

export interface GridProps {
  columns?: number;
}

export interface GridItemProps {
  span?: number;
  image?: ImageMetadata;
  imageAlt?: string;
  As?: "div" | "a";
  link?: string;
  xl?: boolean;
}

export interface HeroProps {
  invert?: boolean;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  searchParams: URLSearchParams;
}

export interface PillProps {
  color?: keyof typeof pillColors;
  title: string;
}

export interface PresetBarProps {
  params: [string, string][];
}

export interface SectionProps extends ClassNameProps {
  id?: string;
}

// Tourism-specific component interfaces

// Updated from ShowCarsProps to ShowToursProps
export interface ShowToursProps {
  recent?: boolean;
  featured?: boolean;
  popular?: boolean; // New for tourism
  sustainable?: boolean; // New for eco-friendly tours
  slugs?: string[];
  ui?: "list" | "grid";
  destination?: string; // Filter by specific destination
  tourType?: string; // Filter by tour type
}

// Legacy alias for migration compatibility
export interface ShowCarsProps extends ShowToursProps {}

// Updated tour card interface (replacing car card)
export interface CardTourProps {
  tour: Tour;
  index?: number;
  showDestination?: boolean;
  showDuration?: boolean;
  showDifficulty?: boolean;
}

// Legacy alias for migration compatibility
export interface CardCarProps extends CardTourProps {
  car: Tour; // Alias for tour
}

export interface Stat {
  title: string;
  value: string;
  animateNumber?: boolean;
  animateFrom?: number;
}

export interface StatsProps {
  items: Stat[];
}

export interface WideImageProps extends ClassNameProps {
  image: ImageMetadata;
  alt: string;
}

// Tourism-specific pricing interfaces (replacing loan calculator)
export interface BookingInquiryProps {
  price: number;
  tourTitle: string;
  tourCode?: string;
}

// Legacy alias for compatibility
export interface LoanCalculatorProps extends BookingInquiryProps {}

// Updated pricing interface for tours
export interface CardPriceProps {
  data: {
    price: number;
    salePrice?: number;
    currency?: "USD" | "COP";
    duration?: {
      days: number;
      nights: number;
    };
  };
}

export interface PriceProps {
  properties: {
    price: number;
    salePrice?: number;
    currency?: "USD" | "COP";
    duration?: {
      days: number;
      nights: number;
    };
  };
}

// Updated gallery interface for tours
export interface SliderProps {
  image: ImageMetadata;
  alt: string;
  gallery: { image: ImageMetadata; alt: string }[];
}

// Tourism booking widget (replacing loan widget)
export interface WidgetBookingProps {
  price: number;
  tourTitle: string;
  tour?: Tour;
  duration?: {
    days: number;
    nights: number;
  };
  groupSize?: {
    min: number;
    max: number;
  };
}

// Legacy alias for compatibility
export interface WidgetLoanProps extends WidgetBookingProps {}

export interface TestimonialProps {
  id?: string;
  showTourInfo?: boolean; // Show which tour they took
}

// New tourism-specific interfaces

export interface TourFilterData {
  destinations: string[];
  tourTypes: string[];
  categories: string[];
  difficulties: string[];
  durations: { label: string; value: string }[];
  priceRanges: { label: string; min: number; max?: number }[];
  count: number;
}

// Filter sidebar data (updated from car sidebar)
export interface SidebarFiltersData {
  destinations: string[];
  tourTypes: string[];
  difficulties: string[];
  durations: string[];
  count: number;
  priceSteps: number[];
}

// Legacy alias for compatibility
export interface SidebarCarsData extends SidebarFiltersData {
  makes: string[]; // Will map to destinations
  colors: string[]; // Will be removed
}

export interface TourSearchParams {
  destination?: string;
  tourType?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  priceFrom?: string;
  priceTo?: string;
  groupSize?: string;
  language?: string;
  sort?: string;
  search?: string;
  page?: string;
}

// Legacy alias for car search params
export interface CarSearchParams extends TourSearchParams {
  make?: string; // Maps to destination
  model?: string; // Maps to category
  bodyType?: string; // Maps to tourType
  color?: string; // Will be removed
}

export interface DestinationPageProps {
  destination: string;
  tours: Tour[];
  totalCount: number;
  description?: string;
  highlights?: string[];
  bestTimeToVisit?: string[];
}

// Legacy alias for makes page
export interface MakesPageProps extends DestinationPageProps {}

export interface TourDetailProps {
  tour: Tour;
  relatedTours?: Tour[];
  showBookingForm?: boolean;
}

// Legacy alias for car detail
export interface CarDetailProps extends TourDetailProps {
  car: Tour; // Alias for tour
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals?: string[];
  accommodation?: string;
}

export interface TourItineraryProps {
  days: ItineraryDay[];
  totalDays: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  groupSize: number;
  message?: string;
  tourCode?: string;
}

export interface TourHighlights {
  included: string[];
  excluded: string[];
  requirements: string[];
  recommendations: string[];
}

// Menus (unchanged structure, but content will be updated)
export interface MainMenuItem {
  id: string;
  label: string;
  url?: string;
  submenu?: MainMenuItem[];
  isExternal?: boolean;
  icon?: string;
}

export interface MenuNavigation {
  prettyName: string;
  items: {
    name: string;
    url: string;
  }[];
}

// Tourism-specific search and filter types
export interface TourSortOptions {
  priceAsc: "Price: Low to High";
  priceDesc: "Price: High to Low";
  durationAsc: "Duration: Short to Long";
  durationDesc: "Duration: Long to Short";
  popularityDesc: "Most Popular";
  newest: "Newest Tours";
}

export interface FilterPresets {
  adventure: { tourType: "Adventure"; difficulty: "Challenging" };
  cultural: { tourType: "Cultural"; difficulty: "Easy" };
  luxury: { priceFrom: "1000" };
  budget: { priceTo: "500" };
  weekends: { duration: "2-3" };
  family: { difficulty: "Easy"; groupSize: "4+" };
}

// Blog types updated for tourism
export interface BlogDestinationMeta {
  destination?: string;
  readTime?: number;
  relatedTours?: string[]; // Tour slugs
}

// Enhanced team member for tourism
export interface TourGuideProfile {
  specialties: string[];
  languages: string[];
  experience: string;
  certifications?: string[];
  favoriteDestination?: string;
}

// Enhanced testimonial for tourism
export interface TourTestimonialMeta {
  tourTaken?: string;
  travelDate?: string;
  verified: boolean;
  groupSize?: number;
  travelStyle?: string;
}

export interface ShowDestinationsProps {
  recent?: boolean;
  featured?: boolean;
  slugs?: string[];
  ui?: "list" | "grid";
}
