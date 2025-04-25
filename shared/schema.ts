import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (for admin/members)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").default("member"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
});

// Lodge information
export const lodge = pgTable("lodge", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  number: integer("number").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  phone: text("phone"),
  email: text("email"),
  foundingYear: integer("founding_year"),
  meetingDays: text("meeting_days"),
  meetingTime: text("meeting_time"),
});

export const lodgeSchema = createInsertSchema(lodge);

// Announcements/News
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow(),
  author: integer("author").references(() => users.id),
  slug: text("slug").notNull(),
  isPublished: boolean("is_published").default(true),
});

export const announcementSchema = createInsertSchema(announcements);

// Calendars (for multiple ICS sources)
export const calendars = pgTable("calendars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  icsUrl: text("ics_url").notNull(),
  color: text("color").default("#1a4b8f"),
  isActive: boolean("is_active").default(true),
});

export const calendarSchema = createInsertSchema(calendars);

// Calendar Events
export const calendarEvents = pgTable("calendar_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  location: text("location"),
  calendarId: integer("calendar_id").references(() => calendars.id),
});

export const calendarEventSchema = createInsertSchema(calendarEvents);

// Lodge Officers
export const officers = pgTable("officers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  year: text("year").notNull(),
  imageUrl: text("image_url"),
  order: integer("order").notNull(),
});

export const officerSchema = createInsertSchema(officers);

// Past Masters
export const pastMasters = pgTable("past_masters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  year: integer("year").notNull(),
});

export const pastMasterSchema = createInsertSchema(pastMasters);

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const contactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true,
});

// Products (for WooCommerce-like functionality)
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  isActive: boolean("is_active").default(true),
});

export const productSchema = createInsertSchema(products);

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Lodge = typeof lodge.$inferSelect;
export type InsertLodge = z.infer<typeof lodgeSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof announcementSchema>;

export type Calendar = typeof calendars.$inferSelect;
export type InsertCalendar = z.infer<typeof calendarSchema>;

export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type InsertCalendarEvent = z.infer<typeof calendarEventSchema>;

export type Officer = typeof officers.$inferSelect;
export type InsertOfficer = z.infer<typeof officerSchema>;

export type PastMaster = typeof pastMasters.$inferSelect;
export type InsertPastMaster = z.infer<typeof pastMasterSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof contactSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof productSchema>;
