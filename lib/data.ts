export const phone = "tel:+263788828681";
export const whatsapp = (
  message = "Hello Hexham Bricks, I'd like to enquire about bricks for my project.",
) => `https://wa.me/263788828681?text=${encodeURIComponent(message)}`;
export const products = [
  {
    slug: "common-bricks",
    name: "Common bricks",
    image: "bricks-detail",
    tag: "Every build starts here",
    description:
      "Discuss building brick options for your residential, commercial or general construction requirements.",
    applications:
      "General masonry and building work. Confirm suitability, dimensions and available brick options with Hexham before ordering.",
  },
  {
    slug: "general-building-bricks",
    name: "General building bricks",
    image: "brick-stacks",
    tag: "The material behind the plan",
    description:
      "Explore the bricks available for your next build. Share your requirements so we can discuss the right supply options.",
    applications:
      "Building projects with different material needs. Tell us about the intended use so availability and suitability can be confirmed.",
  },
  {
    slug: "bulk-brick-orders",
    name: "Bulk brick orders",
    image: "stock-yard",
    tag: "Think in project quantities",
    description:
      "For larger quantities and recurring requirements, start a conversation about stock, timing and transport.",
    applications:
      "Larger building requirements and contractor enquiries. Quantities, stock and arrangements are confirmed on enquiry.",
  },
  {
    slug: "project-supply",
    name: "Project supply",
    image: "loaded-truck",
    tag: "Supply meets movement",
    description:
      "Bring your material requirement and project location together in one enquiry.",
    applications:
      "Project order coordination, with handling and transport requirements discussed for the specific order.",
  },
];
export const gallery = [
  {
    image: "loaded-truck",
    category: "Logistics",
    label: "Loaded and ready for the next stage",
  },
  {
    image: "brick-stacks",
    category: "Bricks",
    label: "Brick stock in the yard",
  },
  {
    image: "crane-loading",
    category: "Loading",
    label: "Crane-equipped material handling",
  },
  {
    image: "wide-yard",
    category: "Yard",
    label: "Stock and equipment, together",
  },
  {
    image: "blue-truck",
    category: "Logistics",
    label: "Transport capability at work",
  },
  { image: "stock-yard", category: "Bricks", label: "Project quantities" },
  {
    image: "orange-truck",
    category: "Loading",
    label: "Preparing a loaded truck",
  },
  { image: "yard-rows", category: "Yard", label: "Rows of building materials" },
];
