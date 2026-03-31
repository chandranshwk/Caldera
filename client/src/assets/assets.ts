import { faker } from "@faker-js/faker";

export interface ForgeDocument {
  id: number;
  type: "pdf" | "words" | "excel";
  name: string;
  extension: ".docx" | ".xlsx" | ".pdf";
  des: string;
  sharedCount: number;
  downloadCount: number;
  editedAt: string;
  project: string;
  status: "Final" | "In Review" | "Draft";
  size: string;
}

export const RECENT_FILES = Array.from({ length: 20 }, (_, index) => {
  const type = faker.helpers.arrayElement(["pdf", "words", "excel"]);
  const extension =
    type === "words" ? ".docx" : type === "excel" ? ".xlsx" : ".pdf";

  return {
    id: index + 1,
    // Column: File (Icon/Type)
    type: type,
    // Column: Name
    name: faker.system.fileName().split(".").slice(0, -1).join("-"),
    extension: extension,
    // Column: Description
    des: faker.lorem.sentence({ min: 20, max: 25 }),
    // Column: Shared (Count)
    sharedCount: faker.number.int({ min: 0, max: 50 }),
    // Column: Downloads
    downloadCount: faker.number.int({ min: 0, max: 500 }),
    // Column: Last Modified
    editedAt: faker.helpers.arrayElement([
      "2 hours ago",
      "5 hours ago",
      "Yesterday",
      "2 days ago",
      "Last week",
      "Oct 12",
    ]),
    // Extra metadata for the UI
    project: faker.helpers.arrayElement([
      "Finance Core",
      "Marketing 2024",
      "Product Dev",
      "Nexus Launch",
    ]),
    status: faker.helpers.arrayElement(["Final", "In Review", "Draft"]),
    size: `${faker.number.float({ min: 0.5, max: 15, fractionDigits: 1 })} MB`,
  };
});
