import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { announcementSchema, calendarEventSchema, calendarSchema, contactSchema, lodgeSchema, officerSchema, pastMasterSchema, productSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lodge Information API
  app.get('/api/lodge', async (req, res) => {
    const lodge = await storage.getLodge();
    res.json(lodge);
  });
  
  // Announcements API
  app.get('/api/announcements', async (req, res) => {
    const announcements = await storage.getAnnouncements();
    res.json(announcements);
  });
  
  app.get('/api/announcements/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const announcement = await storage.getAnnouncement(id);
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    res.json(announcement);
  });
  
  // Calendar Events API
  app.get('/api/events', async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });
  
  app.get('/api/calendars', async (req, res) => {
    const calendars = await storage.getCalendars();
    res.json(calendars);
  });
  
  app.get('/api/calendars/:id/events', async (req, res) => {
    const calendarId = parseInt(req.params.id);
    const events = await storage.getEventsByCalendar(calendarId);
    res.json(events);
  });
  
  // Endpoint to sync events from ICS sources
  app.post('/api/calendars/sync', async (req, res) => {
    try {
      const newEvents = await storage.syncIcsCalendarEvents();
      res.status(200).json({ 
        message: 'Calendar events synced successfully', 
        count: newEvents.length,
        events: newEvents 
      });
    } catch (error) {
      console.error('Error syncing calendar events:', error);
      res.status(500).json({ message: 'Failed to sync calendar events' });
    }
  });
  
  // Officers API
  app.get('/api/officers', async (req, res) => {
    const officers = await storage.getOfficers();
    res.json(officers);
  });
  
  // Past Masters API
  app.get('/api/past-masters', async (req, res) => {
    const pastMasters = await storage.getPastMasters();
    res.json(pastMasters);
  });
  
  // Contact form API
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = contactSchema.parse(req.body);
      await storage.createContactMessage(contactData);
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid form data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to send message' });
    }
  });
  
  // Products API (for WooCommerce-like functionality)
  app.get('/api/products', async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });
  
  app.get('/api/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await storage.getProduct(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
