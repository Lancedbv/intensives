import React, { useState, useEffect } from "react";

// ============================================================
// MOCK DATA
// ============================================================

const MOCK_ORG = { name: "Amsterdam Dance Centre", email: "info@adc-dance.com", logo: null, stripeConnected: true, stripeAccountId: "acct_mock_1234" };

const MOCK_PROGRAMS = [
  { id: "p1", name: "ADC Summer Intensive 2026", type: "intensive", model: "A", status: "published", description: "A transformative 2-week contemporary dance intensive featuring world-class choreographers.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=1200&h=400&fit=crop", location: "Amsterdam, Netherlands", venue: "Amsterdam Dance Centre", startDate: "2026-07-06", endDate: "2026-07-17", applicationDeadline: "2026-05-15", confirmationDeadline: "2026-06-01", capacity: 40, waitlistSize: 10, basePrice: 1200, earlyBirdPrice: 980, earlyBirdCutoff: "2026-04-01", currency: "EUR", paymentMode: "installments", installments: [{ amount: 600, dueLabel: "Upon confirmation" }, { amount: 600, dueLabel: "June 15, 2026" }], scholarshipTiers: [{ id: "s1", name: "Full Scholarship", discount: 100 }, { id: "s2", name: "50% Scholarship", discount: 50 }, { id: "s3", name: "Housing Scholarship", discount: 0, note: "Free housing included" }], refundPolicy: [{ daysBefore: 30, refundPct: 80 }, { daysBefore: 15, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }], refundPolicyText: "Cancellations must be submitted in writing via email. Refunds are processed within 14 business days.", applicationFields: ["headshot", "dance_reel", "cv", "motivation_letter"], applicationConfig: { materials: ["headshot", "dance_reel", "cv", "motivation_letter"], fields: [], customQuestions: [{ id: "cq1", label: "Why are you interested in this opportunity?", type: "text", required: true, placeholder: "", options: [] }, { id: "cq2", label: "Are you available for the full rehearsal period?", type: "select", required: true, placeholder: "", options: ["Yes", "No"] }], customMaterials: [{ id: "cm1", label: "Improvisation Video", type: "video" }] }, applicationFee: 25, styles: ["Contemporary", "Modern", "Improvisation"], level: "Intermediate to Advanced", ageRange: "18-35", createdAt: "2026-01-15", bannerGradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 30%, #604DFF 60%, #8B7AFF 100%)", faq: [{ id: "fq1", q: "Where is the venue located?", a: "Our studios are centrally located in Amsterdam, easily accessible by public transport." }, { id: "fq2", q: "What should I bring?", a: "Please bring comfortable dance clothing, knee pads, water bottle, and a notebook." }, { id: "fq3", q: "Is accommodation included?", a: "Accommodation is not included in the program fee. We can recommend nearby options." }, { id: "fq4", q: "Are meals provided?", a: "Light snacks and water are provided. Lunch breaks allow you to explore nearby restaurants." }, { id: "fq5", q: "What is the daily schedule?", a: "Classes run from 10:00-18:00 with a 1-hour lunch break. Detailed schedule shared before arrival." }],
    faculty: [
      { name: "Akram Khan", role: "Guest Choreographer", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", bio: "Acclaimed choreographer blending kathak with contemporary movement. Multiple Olivier Award winner." },
      { name: "Crystal Pite", role: "Artistic Director", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", bio: "Kidd Pivot founder. Known for pushing the boundaries of physical storytelling on stage." },
      { name: "Ohad Naharin", role: "Master Teacher", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", bio: "Creator of the Gaga movement language. Former artistic director of Batsheva Dance Company." },
      { name: "Sharon Eyal", role: "Guest Teacher", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", bio: "Visionary choreographer known for hypnotic, trance-like movement vocabulary." },
    ],
    testimonials: [
      { name: "Lena M\u00fcller", quote: "The most transformative dance experience of my career. Every single day pushed me further than I thought possible.", year: "2025" },
      { name: "Carlos Rivera", quote: "World-class faculty and an incredibly supportive environment. I left Amsterdam a completely different dancer.", year: "2025" },
      { name: "Yuki Tanaka", quote: "This intensive changed my understanding of what contemporary dance can be. The connections I made here are for life.", year: "2025" },
    ],
    canvas: {
      enabled: true,
      templateId: "marquee",
      sections: [
        { id: "hero", label: "Hero Banner", icon: "image", enabled: true, order: 0 },
        { id: "program", label: "Program Overview", icon: "fileText", enabled: true, order: 1 },
        { id: "faculty", label: "Faculty & Artists", icon: "users", enabled: true, order: 2 },
        { id: "trailer", label: "Trailer / Media", icon: "eye", enabled: true, order: 3 },
        { id: "pricing", label: "Pricing", icon: "dollar", enabled: true, order: 4 },
        { id: "weeks", label: "Program Weeks", icon: "layers", enabled: false, order: 5 },
        { id: "schedule", label: "Schedule", icon: "calendar", enabled: false, order: 6 },
        { id: "workshops", label: "Workshop Catalog", icon: "grid", enabled: false, order: 7 },
        { id: "testimonials", label: "Testimonials", icon: "star", enabled: true, order: 8 },
        { id: "faq", label: "FAQ", icon: "clipboardList", enabled: false, order: 9 },
        { id: "refunds", label: "Refund Policy", icon: "refreshCw", enabled: false, order: 10 },
        { id: "location", label: "Location & Logistics", icon: "mapPin", enabled: false, order: 11 },
        { id: "contact", label: "Contact", icon: "mail", enabled: false, order: 12 },
        { id: "cta", label: "CTA Footer", icon: "zap", enabled: true, order: 13 },
      ],
      brand: { accentColor: "#604dff", fontPairId: "instrument-outfit", logoUrl: null, heroMediaUrl: null, titleColor: null, titleFont: null, bodyColor: null, bodyFont: null, buttonColor: null, buttonTextColor: null, buttonFont: null, customDomain: "", slug: "adc-summer-intensive-2026" },
      slug: "adc-summer-intensive-2026",
      publishedAt: "2026-03-20T12:00:00Z",
    }
  },
  { id: "p2", name: "Urban Grooves Workshop", type: "workshop", model: "C", status: "published", description: "An explosive full-day workshop exploring hip-hop, house, and waacking foundations with top urban dancers.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&h=400&fit=crop", location: "Rotterdam, Netherlands", venue: "Dansmakers Studio", startDate: "2026-04-12", endDate: "2026-04-12", capacity: 60, basePrice: 85, earlyBirdPrice: 65, earlyBirdCutoff: "2026-03-28", currency: "EUR", paymentMode: "full", scholarshipTiers: [], refundPolicy: [{ daysBefore: 7, refundPct: 100 }, { daysBefore: 3, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }], applicationFields: [], applicationFee: 0, styles: ["Hip-Hop", "House", "Waacking"], level: "All Levels", createdAt: "2026-02-20", bannerGradient: "linear-gradient(135deg, #1a1200 0%, #3d2e00 30%, #F5A623 60%, #FFD580 100%)", faq: [{ id: "fq1", q: "Where is the venue located?", a: "Our studios are centrally located in Amsterdam, easily accessible by public transport." }, { id: "fq2", q: "What should I bring?", a: "Please bring comfortable dance clothing, knee pads, water bottle, and a notebook." }, { id: "fq3", q: "Is accommodation included?", a: "Accommodation is not included in the program fee. We can recommend nearby options." }, { id: "fq4", q: "Are meals provided?", a: "Light snacks and water are provided. Lunch breaks allow you to explore nearby restaurants." }, { id: "fq5", q: "What is the daily schedule?", a: "Classes run from 10:00-18:00 with a 1-hour lunch break. Detailed schedule shared before arrival." }] },
  { id: "p3", name: "Ballet Masterclass with Maria Torres", type: "masterclass", model: "C", status: "published", description: "A 3-hour masterclass in classical technique and artistry with former Royal Ballet principal Maria Torres.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&h=400&fit=crop", location: "Brussels, Belgium", venue: "Royal Conservatory Hall", startDate: "2026-05-03", endDate: "2026-05-03", capacity: 80, basePrice: 45, currency: "EUR", paymentMode: "full", scholarshipTiers: [], refundPolicy: [{ daysBefore: 3, refundPct: 100 }, { daysBefore: 0, refundPct: 0 }], applicationFields: [], applicationFee: 0, styles: ["Ballet", "Classical"], level: "Advanced", createdAt: "2026-03-01", bannerGradient: "linear-gradient(135deg, #001a0d 0%, #003d1f 30%, #1DB954 60%, #4DE88A 100%)" },
  { id: "p4", name: "Floorwork & Release Intensive", type: "intensive", model: "A", status: "draft", description: "5-day intensive exploring floorwork, release technique, and contact improvisation.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=400&fit=crop", location: "Berlin, Germany", venue: "Tanzfabrik", startDate: "2026-08-18", endDate: "2026-08-22", applicationDeadline: "2026-07-01", confirmationDeadline: "2026-07-15", capacity: 25, waitlistSize: 5, basePrice: 650, currency: "EUR", paymentMode: "full", scholarshipTiers: [{ id: "s4", name: "Emerging Artist Grant", discount: 100 }], refundPolicy: [{ daysBefore: 14, refundPct: 80 }, { daysBefore: 7, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }], applicationFields: ["headshot", "dance_reel", "motivation_letter"], applicationFee: 0, styles: ["Contemporary", "Release", "Contact Improv"], level: "Intermediate", ageRange: "20-40", createdAt: "2026-03-10", bannerGradient: "linear-gradient(135deg, #1a0020 0%, #4A0066 30%, #9B59B6 60%, #D2A8E0 100%)" },
  { id: "p5", name: "Commercial Dance Bootcamp", type: "workshop", model: "C", status: "closed", description: "Weekend bootcamp for commercial dance — music video style, heels choreography, and stage performance.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1200&h=400&fit=crop", location: "London, UK", venue: "Pineapple Dance Studios", startDate: "2026-03-08", endDate: "2026-03-09", capacity: 45, basePrice: 120, currency: "GBP", paymentMode: "full", scholarshipTiers: [], refundPolicy: [{ daysBefore: 7, refundPct: 100 }, { daysBefore: 0, refundPct: 0 }], applicationFields: [], applicationFee: 0, styles: ["Commercial", "Heels", "Music Video"], level: "All Levels", createdAt: "2026-01-28", bannerGradient: "linear-gradient(135deg, #001a33 0%, #003366 30%, #1E90FF 60%, #87CEEB 100%)" },
  { id: "p6", name: "Batsheva Summer Intensive", type: "intensive", model: "A", status: "published", description: "A prestigious 3-week summer program. Artists apply once and are assigned to one of three specialized weeks based on their profile and preferences.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&h=400&fit=crop", location: "Tel Aviv, Israel", venue: "Suzanne Dellal Centre", startDate: "2026-07-06", endDate: "2026-07-24", applicationDeadline: "2026-05-01", confirmationDeadline: "2026-05-20", capacity: 60, waitlistSize: 15, basePrice: 800, currency: "EUR", paymentMode: "full", scholarshipTiers: [{ id: "s-b1", name: "Partial Scholarship", discount: 50 }], refundPolicy: [{ daysBefore: 30, refundPct: 80 }, { daysBefore: 14, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }], applicationFields: ["headshot", "dance_reel", "motivation_letter"], applicationFee: 0, styles: ["Gaga", "Contemporary", "Repertory"], level: "Intermediate to Advanced", ageRange: "18-30", createdAt: "2026-02-01", bannerGradient: "linear-gradient(135deg, #1a0a00 0%, #4a2000 30%, #E65100 60%, #FF9800 100%)", weeks: [{ id: "w1", name: "Week 1: Foundations", startDate: "2026-07-06", endDate: "2026-07-10", capacity: 20, price: 300, spotsLeft: 8 }, { id: "w2", name: "Week 2: Exploration", startDate: "2026-07-13", endDate: "2026-07-17", capacity: 20, price: 300, spotsLeft: 14 }, { id: "w3", name: "Week 3: Creation", startDate: "2026-07-20", endDate: "2026-07-24", capacity: 20, price: 300, spotsLeft: 20 }], faculty: [{ name: "Ohad Naharin", role: "Artistic Director", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", bio: "Creator of the Gaga movement language and former artistic director of Batsheva Dance Company." }], faq: [{ id: "fq1", q: "Can I choose which week?", a: "You may indicate your preference, but final assignment is made by the artistic team based on your profile." }, { id: "fq2", q: "Is the price per week?", a: "Yes, each week has its own pricing. You will be assigned to and pay for one week." }] },
  { id: "p7", name: "ImPulsTanz Festival Workshops", type: "festival", model: "B", status: "published", description: "Vienna's legendary dance festival. Choose from a curated selection of workshops led by world-renowned artists. Build your own intensive experience.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1200&h=400&fit=crop", location: "Vienna, Austria", venue: "Multiple Venues", startDate: "2026-07-15", endDate: "2026-08-10", capacity: 200, basePrice: 0, currency: "EUR", paymentMode: "full", scholarshipTiers: [], refundPolicy: [{ daysBefore: 14, refundPct: 80 }, { daysBefore: 7, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }], applicationFields: [], applicationFee: 0, styles: ["Contemporary", "Gaga", "Release", "Afro-Fusion", "Contact Improv", "Hip-Hop"], level: "All Levels", createdAt: "2026-01-10", bannerGradient: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 30%, #9C27B0 60%, #CE93D8 100%)", selectionMode: "none", bundlePricing: [{ minSessions: 3, discount: 10, label: "Book 3+, save 10%" }, { minSessions: 5, discount: 20, label: "Book 5+, save 20%" }], workshops: [{ id: "ws1", title: "Gaga Movement Language", description: "Explore the Gaga movement language developed by Ohad Naharin. Focus on sensation, efficiency, and the joy of movement.", teacher: { name: "Ohad Naharin", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", bio: "Creator of Gaga, former artistic director of Batsheva Dance Company." }, image: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=600&h=400&fit=crop", price: 85, location: "Arsenal Studio A", level: "All Levels", styles: ["Gaga", "Contemporary"], capacity: 30, spotsLeft: 12, times: [{ date: "2026-07-16", startTime: "10:00", endTime: "12:00" }, { date: "2026-07-17", startTime: "10:00", endTime: "12:00" }], trailerUrl: null, gallery: [] }, { id: "ws2", title: "Forsythe Improvisation Technologies", description: "Dive into William Forsythe's improvisation tools. Geometric thinking, counterpoint, and spatial awareness for advanced movers.", teacher: { name: "Riley Watts", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", bio: "Former Forsythe Company dancer, specialist in improvisation technologies." }, image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=400&fit=crop", price: 95, location: "Burgtheater Studio", level: "Advanced", styles: ["Contemporary", "Improvisation"], capacity: 20, spotsLeft: 6, times: [{ date: "2026-07-18", startTime: "14:00", endTime: "17:00" }], trailerUrl: null, gallery: [] }, { id: "ws3", title: "Afro-Fusion Lab", description: "A vibrant exploration of African dance traditions fused with contemporary movement. Rhythm, grounding, and cultural expression.", teacher: { name: "Germaine Acogny", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face", bio: "Pioneer of contemporary African dance, founder of \u00c9cole des Sables." }, image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&h=400&fit=crop", price: 75, location: "MuseumsQuartier Hall", level: "All Levels", styles: ["Afro-Fusion", "Contemporary"], capacity: 35, spotsLeft: 20, times: [{ date: "2026-07-20", startTime: "10:00", endTime: "13:00" }], trailerUrl: null, gallery: [] }, { id: "ws4", title: "Contact Improvisation Intensive", description: "Three days of deep contact improvisation practice. Weight sharing, momentum, falling, and the art of listening through touch.", teacher: { name: "Nancy Stark Smith", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", bio: "Pioneer of Contact Improvisation, editor of Contact Quarterly." }, image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=400&fit=crop", price: 120, location: "Arsenal Studio B", level: "Intermediate", styles: ["Contact Improv", "Contemporary"], capacity: 25, spotsLeft: 15, times: [{ date: "2026-07-22", startTime: "10:00", endTime: "16:00" }, { date: "2026-07-23", startTime: "10:00", endTime: "16:00" }, { date: "2026-07-24", startTime: "10:00", endTime: "16:00" }], trailerUrl: null, gallery: [] }, { id: "ws5", title: "Hip-Hop Choreography Masterclass", description: "Learn commercial and artistic hip-hop choreography. Musicality, texture, and storytelling through urban movement.", teacher: { name: "Les Twins", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face", bio: "World-renowned hip-hop dancers, Beyonc\u00e9 collaborators." }, image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=400&fit=crop", price: 65, location: "Volkstheater Studio", level: "Intermediate", styles: ["Hip-Hop", "Commercial"], capacity: 40, spotsLeft: 28, times: [{ date: "2026-07-25", startTime: "14:00", endTime: "17:00" }], trailerUrl: null, gallery: [] }, { id: "ws6", title: "Release Technique & Floorwork", description: "Surrender to gravity. Explore release technique, spiraling, and floorwork as tools for efficient, expressive movement.", teacher: { name: "David Zambrano", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", bio: "Venezuelan-born dancer and choreographer, creator of Flying Low technique." }, image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop", price: 90, location: "Arsenal Studio A", level: "All Levels", styles: ["Release", "Contemporary", "Floorwork"], capacity: 25, spotsLeft: 18, times: [{ date: "2026-07-28", startTime: "10:00", endTime: "13:00" }, { date: "2026-07-29", startTime: "10:00", endTime: "13:00" }], trailerUrl: null, gallery: [] }], faq: [{ id: "fq1", q: "Can I combine multiple workshops?", a: "Yes! Build your own schedule by selecting any combination of workshops. Bundle discounts apply for 3+ and 5+ bookings." }, { id: "fq2", q: "Are there schedule conflicts?", a: "Some workshops may overlap. Check the dates and times before booking to ensure your selections work together." }], canvas: { enabled: true, templateId: "marquee", sections: [{ id: "hero", label: "Hero Banner", icon: "image", enabled: true, order: 0 }, { id: "program", label: "Program Overview", icon: "fileText", enabled: true, order: 1 }, { id: "faculty", label: "Faculty & Artists", icon: "users", enabled: false, order: 2 }, { id: "trailer", label: "Trailer / Media", icon: "eye", enabled: false, order: 3 }, { id: "pricing", label: "Pricing", icon: "dollar", enabled: false, order: 4 }, { id: "weeks", label: "Program Weeks", icon: "layers", enabled: false, order: 5 }, { id: "schedule", label: "Schedule", icon: "calendar", enabled: false, order: 6 }, { id: "workshops", label: "Workshop Catalog", icon: "grid", enabled: true, order: 7 }, { id: "testimonials", label: "Testimonials", icon: "star", enabled: false, order: 8 }, { id: "faq", label: "FAQ", icon: "clipboardList", enabled: true, order: 9 }, { id: "refunds", label: "Refund Policy", icon: "refreshCw", enabled: false, order: 10 }, { id: "location", label: "Location & Logistics", icon: "mapPin", enabled: false, order: 11 }, { id: "contact", label: "Contact", icon: "mail", enabled: false, order: 12 }, { id: "cta", label: "CTA Footer", icon: "zap", enabled: true, order: 13 }], brand: { accentColor: "#9C27B0", fontPairId: "instrument-outfit", logoUrl: null, heroMediaUrl: null, titleColor: null, titleFont: null, bodyColor: null, bodyFont: null, buttonColor: null, buttonTextColor: null, buttonFont: null, customDomain: "", slug: "impulstanz-festival-2026" }, slug: "impulstanz-festival-2026", publishedAt: "2026-03-20T12:00:00Z" } },
  { id: "p8", name: "Advanced Partnering Lab", type: "workshop", model: "D", status: "published", description: "An exclusive 2-day partnering workshop for experienced contemporary dancers. Limited to 20 participants to ensure personalized coaching.", coverImg: null, coverImage: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=1200&h=400&fit=crop", location: "Amsterdam, Netherlands", venue: "Amsterdam Dance Centre", startDate: "2026-06-14", endDate: "2026-06-15", applicationDeadline: "2026-05-30", capacity: 20, basePrice: 180, currency: "EUR", paymentMode: "full", scholarshipTiers: [], refundPolicy: [{ daysBefore: 7, refundPct: 100 }, { daysBefore: 3, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }], applicationFields: ["experience_level"], applicationFee: 0, styles: ["Contemporary", "Partnering"], level: "Advanced", createdAt: "2026-03-18", bannerGradient: "linear-gradient(135deg, #0d1117 0%, #1a3a4a 30%, #2196F3 60%, #64B5F6 100%)", faq: [{ id: "fq1", q: "What level is required?", a: "This workshop is for advanced/professional dancers with significant partnering experience." }, { id: "fq2", q: "What should I wear?", a: "Comfortable form-fitting clothing suitable for contact and floor work." }] }
];

const MOCK_APPLICATIONS = [
  { id: "a1", programId: "p1", name: "Lena M\u00fcller", email: "lena.m@dance.de", age: 23, nationality: "German", location: "Berlin", status: "accepted", scholarshipTierId: null, waitlistPosition: null, headshot: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Contemporary Showreel.mp4", size: "24MB" }, { type: "image", name: "Headshot.jpg", size: "2.1MB" }], motivation: "I want to deepen my contemporary technique and be challenged by international choreographers.", experience: "6 years, BA Dance @ HZT Berlin", submittedAt: "2026-02-10", rating: 5, notes: "Exceptional technique, strong application" },
  { id: "a2", programId: "p1", name: "Carlos Rivera", email: "carlos.r@gmail.com", age: 26, nationality: "Spanish", location: "Madrid", status: "accepted", scholarshipTierId: "s2", waitlistPosition: null, headshot: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Freestyle Reel 2025.mp4", size: "18MB" }, { type: "image", name: "Studio Portrait.jpg", size: "3.4MB" }, { type: "image", name: "Performance Still.jpg", size: "1.8MB" }], motivation: "Contemporary dance is my passion. I want to train at the highest level.", experience: "8 years, freelance dancer", submittedAt: "2026-02-12", rating: 4, notes: "Good versatility, awarded 50% scholarship" },
  { id: "a3", programId: "p1", name: "Yuki Tanaka", email: "yuki.t@outlook.com", age: 21, nationality: "Japanese", location: "Tokyo", status: "accepted", scholarshipTierId: "s1", waitlistPosition: null, headshot: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Solo Performance.mp4", size: "32MB" }], motivation: "I dream of training in Europe and expanding my dance vocabulary.", experience: "4 years, contemporary dance student", submittedAt: "2026-02-08", rating: 5, notes: "Outstanding potential, full scholarship recipient" },
  { id: "a4", programId: "p1", name: "Ama Osei", email: "ama.o@danceghana.org", age: 24, nationality: "Ghanaian", location: "Accra", status: "scholarship", scholarshipTierId: "s1", waitlistPosition: null, headshot: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Afro-Contemporary Reel.mp4", size: "28MB" }, { type: "image", name: "Headshot.jpg", size: "2.5MB" }, { type: "image", name: "Company Photo.jpg", size: "4.1MB" }], motivation: "I want to bridge African and European contemporary practices.", experience: "5 years, National Dance Company of Ghana", submittedAt: "2026-02-15", rating: 5, notes: "Incredible presence, full scholarship" },
  { id: "a5", programId: "p1", name: "Sophie Laurent", email: "sophie.l@free.fr", age: 28, nationality: "French", location: "Paris", status: "waitlisted", waitlistPosition: 1, headshot: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Repertoire Highlights.mp4", size: "21MB" }, { type: "image", name: "Headshot.jpg", size: "1.9MB" }], motivation: "I've been freelancing for 5 years and want to reconnect with intensive training.", experience: "10 years, former CNDC Angers", submittedAt: "2026-02-20", rating: 4, notes: "Strong but class is full, waitlist #1" },
  { id: "a6", programId: "p1", name: "Marcus Johnson", email: "marcus.j@dance.us", age: 25, nationality: "American", location: "New York", status: "waitlisted", waitlistPosition: 2, headshot: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Dance Reel.mp4", size: "19MB" }], motivation: "Seeking European perspective on contemporary work.", experience: "7 years, Juilliard graduate", submittedAt: "2026-02-22", rating: 4, notes: "Solid technique, waitlist #2" },
  { id: "a7", programId: "p1", name: "Elena Petrov", email: "elena.p@mail.ru", age: 22, nationality: "Russian", location: "St. Petersburg", status: "rejected", headshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Ballet Variations.mp4", size: "15MB" }, { type: "image", name: "Headshot.jpg", size: "2.0MB" }], motivation: "I want to transition from classical to contemporary.", experience: "3 years, mostly ballet background", submittedAt: "2026-03-01", rating: 2, notes: "Not enough contemporary experience for advanced level" },
  { id: "a8", programId: "p1", name: "Mia Chen", email: "mia.c@dancers.hk", age: 20, nationality: "Hong Kong", location: "Hong Kong", status: "submitted", headshot: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Academy Showreel.mp4", size: "22MB" }, { type: "image", name: "Performance Photo.jpg", size: "3.2MB" }], motivation: "I'm looking for an immersive contemporary experience.", experience: "3 years, studying at HKAPA", submittedAt: "2026-03-05", rating: null, notes: "" },
  { id: "a9", programId: "p1", name: "Lukas Berg", email: "lukas.b@gmail.com", age: 27, nationality: "Swedish", location: "Stockholm", status: "submitted", headshot: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Improv Session.mp4", size: "27MB" }, { type: "image", name: "Headshot.jpg", size: "1.7MB" }, { type: "image", name: "Rehearsal Photo.jpg", size: "2.8MB" }], motivation: "I want to push my limits in improvisation and partnering.", experience: "9 years, Cullberg Ballet trainee", submittedAt: "2026-03-06", rating: null, notes: "" },
  { id: "a10", programId: "p1", name: "Aisha Mohammed", email: "aisha.m@dance.ng", age: 23, nationality: "Nigerian", location: "Lagos", status: "under_review", headshot: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Afro-Contemporary Mix.mp4", size: "20MB" }], motivation: "I blend Afro-contemporary and modern techniques.", experience: "5 years, performing artist", submittedAt: "2026-03-02", rating: 3, notes: "Interesting style, reviewing further" },
  { id: "a11", programId: "p1", name: "Pietro Rossi", email: "pietro.r@dance.it", age: 29, nationality: "Italian", location: "Milan", status: "under_review", headshot: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Physical Theatre Reel.mp4", size: "30MB" }, { type: "image", name: "Headshot.jpg", size: "2.3MB" }], motivation: "I'm transitioning from theater to pure dance.", experience: "6 years, physical theater and dance", submittedAt: "2026-03-03", rating: 3, notes: "Theater background could add interesting dynamic" },
  { id: "a12", programId: "p1", name: "Anna Kowalska", email: "anna.k@dance.pl", age: 24, nationality: "Polish", location: "Warsaw", status: "submitted", headshot: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Contemporary Showreel.mp4", size: "25MB" }, { type: "image", name: "Headshot.jpg", size: "2.0MB" }], motivation: "Contemporary dance intensive is exactly what I need to grow.", experience: "5 years, Polish Dance Theatre", submittedAt: "2026-03-07", rating: null, notes: "" },
  { id: "a13", programId: "p4", name: "Finn O'Brien", email: "finn.o@dance.ie", age: 26, nationality: "Irish", location: "Dublin", status: "submitted", headshot: null, media: [{ type: "video", name: "Floorwork Compilation.mp4", size: "16MB" }], motivation: "I want to deepen my floorwork vocabulary.", experience: "7 years, freelance contemporary", submittedAt: "2026-03-12", rating: null, notes: "" },
  { id: "a14", programId: "p4", name: "Zara Okafor", email: "zara.o@mail.com", age: 22, nationality: "British-Nigerian", location: "London", status: "submitted", headshot: null, media: [{ type: "video", name: "Release Technique.mp4", size: "23MB" }, { type: "image", name: "Headshot.jpg", size: "1.6MB" }, { type: "image", name: "Stage Photo.jpg", size: "3.0MB" }], motivation: "Release technique has changed my practice, I want more depth.", experience: "4 years, Rambert School graduate", submittedAt: "2026-03-14", rating: null, notes: "" },
  { id: "a-b1", programId: "p6", name: "Daniel Kozlov", email: "daniel.k@gmail.com", age: 24, nationality: "Russian", location: "St Petersburg", status: "accepted", weekAssignment: "w1", scholarshipTierId: null, waitlistPosition: null, headshot: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", media: [{ type: "video", name: "Contemporary Reel.mp4", size: "20MB" }], motivation: "I want to train with the Batsheva method.", experience: "5 years, freelance contemporary dancer", submittedAt: "2026-03-05", rating: 4, notes: "Assigned to Week 1" },
  { id: "a-e1", programId: "p8", name: "Sophie Laurent", email: "sophie@dance.fr", age: 27, nationality: "French", location: "Paris", status: "accepted", experienceLevel: "Professional", scholarshipTierId: null, waitlistPosition: null, headshot: null, media: [], motivation: "", experience: "", submittedAt: "2026-04-01", rating: 4, notes: "Strong partnering background", paymentStatus: "pending" },
];

const MOCK_PARTICIPANTS = [
  { id: "pt1", applicationId: "a1", programId: "p1", name: "Lena M\u00fcller", email: "lena.m@dance.de", status: "confirmed", paymentStatus: "paid", totalAmount: 1200, paidAmount: 1200, scholarshipTier: null, confirmedAt: "2026-03-01", group: "A" },
  { id: "pt2", applicationId: "a2", programId: "p1", name: "Carlos Rivera", email: "carlos.r@gmail.com", status: "confirmed", paymentStatus: "partial", totalAmount: 600, paidAmount: 300, scholarshipTier: "50% Scholarship", confirmedAt: "2026-03-02", group: "A" },
  { id: "pt3", applicationId: "a3", programId: "p1", name: "Yuki Tanaka", email: "yuki.t@outlook.com", status: "confirmed", paymentStatus: "paid", totalAmount: 0, paidAmount: 0, scholarshipTier: "Full Scholarship", confirmedAt: "2026-02-28", group: "B" },
  { id: "pt4", applicationId: "a4", programId: "p1", name: "Ama Osei", email: "ama.o@danceghana.org", status: "pending", paymentStatus: "pending", totalAmount: 0, paidAmount: 0, scholarshipTier: "Full Scholarship", confirmedAt: null, group: null },
];

const MOCK_PAYMENTS = [
  { id: "pay1", participantId: "pt1", programId: "p1", amount: 600, platformFee: 42, status: "succeeded", type: "installment_1", paidAt: "2026-03-01", stripePaymentIntentId: "pi_mock_001", invoiceUrl: "#" },
  { id: "pay2", participantId: "pt1", programId: "p1", amount: 600, platformFee: 42, status: "succeeded", type: "installment_2", paidAt: "2026-03-15", stripePaymentIntentId: "pi_mock_002", invoiceUrl: "#" },
  { id: "pay3", participantId: "pt2", programId: "p1", amount: 300, platformFee: 21, status: "succeeded", type: "installment_1", paidAt: "2026-03-02", stripePaymentIntentId: "pi_mock_003", invoiceUrl: "#" },
  { id: "pay4", participantId: "pt2", programId: "p1", amount: 300, platformFee: 21, status: "pending", type: "installment_2", dueDate: "2026-06-15", stripePaymentIntentId: null, invoiceUrl: null },
];

const MOCK_TICKETS = [
  { id: "t1", programId: "p2", buyerName: "James Wilson", buyerEmail: "james.w@gmail.com", quantity: 1, amount: 65, status: "confirmed", purchasedAt: "2026-03-01", ticketCode: "UG-2026-001" },
  { id: "t2", programId: "p2", buyerName: "Lisa Park", buyerEmail: "lisa.p@hotmail.com", quantity: 2, amount: 130, status: "confirmed", purchasedAt: "2026-03-05", ticketCode: "UG-2026-002" },
  { id: "t3", programId: "p2", buyerName: "Tom Baker", buyerEmail: "tom.b@yahoo.com", quantity: 1, amount: 85, status: "confirmed", purchasedAt: "2026-03-20", ticketCode: "UG-2026-003" },
  { id: "t4", programId: "p3", buyerName: "Emma Stone", buyerEmail: "emma.s@dance.be", quantity: 1, amount: 45, status: "confirmed", purchasedAt: "2026-03-10", ticketCode: "BM-2026-001" },
  { id: "t5", programId: "p3", buyerName: "David Kim", buyerEmail: "david.k@gmail.com", quantity: 3, amount: 135, status: "confirmed", purchasedAt: "2026-03-12", ticketCode: "BM-2026-002" },
  { id: "t6", programId: "p5", buyerName: "Rachel Green", buyerEmail: "rachel.g@outlook.com", quantity: 1, amount: 120, status: "refunded", purchasedAt: "2026-02-01", ticketCode: "CD-2026-001" },
];

const MOCK_WORKSHOP_BOOKINGS = [
  { id: "wb1", programId: "p7", workshopIds: ["ws1", "ws3", "ws6"], buyerName: "Elena Vasquez", buyerEmail: "elena.v@dance.com", totalAmount: 225, discountApplied: 10, finalAmount: 202.5, status: "confirmed", purchasedAt: "2026-03-15T10:30:00Z", bookingCode: "WB-2026-001" },
  { id: "wb2", programId: "p7", workshopIds: ["ws2", "ws4"], buyerName: "Marcus Chen", buyerEmail: "marcus.c@gmail.com", totalAmount: 215, discountApplied: 0, finalAmount: 215, status: "confirmed", purchasedAt: "2026-03-16T14:20:00Z", bookingCode: "WB-2026-002" },
  { id: "wb3", programId: "p7", workshopIds: ["ws1", "ws2", "ws4", "ws5", "ws6"], buyerName: "Aisha Okafor", buyerEmail: "aisha.o@outlook.com", totalAmount: 455, discountApplied: 20, finalAmount: 364, status: "confirmed", purchasedAt: "2026-03-18T09:15:00Z", bookingCode: "WB-2026-003" }
];

const MOCK_ACTIVITY = [
  { id: "ac1", type: "application", text: "Anna Kowalska applied to ADC Summer Intensive", time: "2 hours ago", icon: "inbox" },
  { id: "ac2", type: "payment", text: "Payment received: \u20AC600 from Lena M\u00fcller", time: "5 hours ago", icon: "dollar" },
  { id: "ac3", type: "ticket", text: "3 tickets sold for Ballet Masterclass", time: "1 day ago", icon: "ticket" },
  { id: "ac4", type: "confirmation", text: "Carlos Rivera confirmed participation", time: "2 days ago", icon: "check" },
  { id: "ac5", type: "application", text: "Zara Okafor applied to Floorwork Intensive", time: "2 days ago", icon: "inbox" },
  { id: "ac6", type: "publish", text: "Urban Grooves Workshop published", time: "3 days ago", icon: "globe" },
  { id: "ac7", type: "scholarship", text: "Full Scholarship awarded to Yuki Tanaka", time: "5 days ago", icon: "star" },
  { id: "ac8", type: "refund", text: "Refund processed: \u00A3120 to Rachel Green", time: "1 week ago", icon: "back" },
];

const MOCK_MESSAGES = [
  { id: "m1", programId: "p1", segment: "all", subject: "Welcome to ADC Summer Intensive 2026!", body: "Dear participants, we're thrilled to have you join us this summer...", sentAt: "2026-03-05", sentBy: "Admin" },
  { id: "m2", programId: "p1", segment: "overdue", subject: "Payment Reminder", body: "This is a friendly reminder that your next installment is due...", sentAt: "2026-03-18", sentBy: "Admin" },
];

// ============================================================
// CANVAS CONSTANTS
// ============================================================

const CANVAS_TEMPLATES = [
  { id: "marquee", name: "Marquee", sub: "Cinematic · Dark · Video Hero", desc: "Full-bleed video backgrounds, editorial scroll, cinematic pacing. Best for intensives, summer programs.", tier: "free" },
  { id: "editorial", name: "Editorial", sub: "Magazine · Light · Elegant", desc: "Large imagery, generous whitespace, split-layouts, image mosaics. Best for residencies, creative programs.", tier: "free" },
  { id: "atelier", name: "Atelier", sub: "Artistic · Asymmetric · Warm", desc: "Overlapping elements, staggered galleries, avant-garde layouts. Best for labs, experimental programs.", tier: "premium" },
  { id: "grand", name: "Grand", sub: "Luxurious · Bold · Dramatic", desc: "Letterbox hero, gold accents, cast portraits, tour date lists. Best for productions, tours, premieres.", tier: "premium" },
  { id: "studio", name: "Studio", sub: "Raw · Energetic · Video-Forward", desc: "Bold typography, video grids, stat bars, urban energy. Best for workshops, open training, masterclasses.", tier: "free" },
  { id: "horizon", name: "Horizon", sub: "Tech · Side Nav · Scroll-Snap", desc: "Sticky side navigation, full-viewport scroll-snap sections. Best for tech-forward, digital programs.", tier: "premium" },
  { id: "noir", name: "Noir", sub: "Dark · Stacking · Film Noir", desc: "Overlapping stacking cards, dramatic reveals, pure black with red accents. Best for avant-garde, performance art.", tier: "premium" },
  { id: "vivid", name: "Vivid", sub: "Colorful · Pop-In · Playful", desc: "Gradient mesh backgrounds, bouncy card animations, polaroid faculty. Best for youth programs, workshops.", tier: "free" },
  { id: "chronicle", name: "Chronicle", sub: "Timeline · Narrative · Sepia", desc: "Vertical timeline connecting all sections, alternating left/right content. Best for residencies, journeys.", tier: "premium" },
  { id: "prism", name: "Prism", sub: "Glass · Floating · Gradient", desc: "Glass-morphism floating panels, gradient overlays, frosted nav bar. Best for premium, modern brands.", tier: "premium" },
];

const CANVAS_SECTIONS_DEFAULT = [
  { id: "hero", label: "Hero Banner", icon: "image", enabled: true, order: 0 },
  { id: "program", label: "Program Overview", icon: "fileText", enabled: true, order: 1 },
  { id: "faculty", label: "Faculty & Artists", icon: "users", enabled: true, order: 2 },
  { id: "trailer", label: "Trailer / Media", icon: "eye", enabled: true, order: 3 },
  { id: "pricing", label: "Pricing", icon: "dollar", enabled: true, order: 4 },
  { id: "weeks", label: "Program Weeks", icon: "layers", enabled: false, order: 5 },
  { id: "schedule", label: "Schedule", icon: "calendar", enabled: false, order: 6 },
  { id: "workshops", label: "Workshop Catalog", icon: "grid", enabled: false, order: 7 },
  { id: "testimonials", label: "Testimonials", icon: "star", enabled: false, order: 8 },
  { id: "faq", label: "FAQ", icon: "clipboardList", enabled: false, order: 9 },
  { id: "refunds", label: "Refund Policy", icon: "refreshCw", enabled: false, order: 10 },
  { id: "location", label: "Location & Logistics", icon: "mapPin", enabled: false, order: 11 },
  { id: "contact", label: "Contact", icon: "mail", enabled: false, order: 12 },
  { id: "cta", label: "CTA Footer", icon: "zap", enabled: true, order: 13 },
];

const CANVAS_FONTS = [
  { id: "instrument", label: "Instrument Serif", family: "'Instrument Serif', Georgia, serif", type: "serif" },
  { id: "playfair", label: "Playfair Display", family: "'Playfair Display', Georgia, serif", type: "serif" },
  { id: "cormorant", label: "Cormorant Garamond", family: "'Cormorant Garamond', Georgia, serif", type: "serif" },
  { id: "outfit", label: "Outfit", family: "'Outfit', system-ui, sans-serif", type: "sans" },
  { id: "dmsans", label: "DM Sans", family: "'DM Sans', system-ui, sans-serif", type: "sans" },
  { id: "inter", label: "Inter", family: "'Inter', system-ui, sans-serif", type: "sans" },
  { id: "jetbrains", label: "JetBrains Mono", family: "'JetBrains Mono', monospace", type: "mono" },
];

const CANVAS_FONT_PAIRS = [
  { id: "instrument-outfit", serif: "'Instrument Serif', Georgia, serif", sans: "'Outfit', system-ui, sans-serif", label: "Instrument + Outfit", sample: "The Art of Movement" },
  { id: "playfair-dm", serif: "'Playfair Display', Georgia, serif", sans: "'DM Sans', system-ui, sans-serif", label: "Playfair + DM Sans", sample: "The Art of Movement" },
  { id: "cormorant-inter", serif: "'Cormorant Garamond', Georgia, serif", sans: "'Inter', system-ui, sans-serif", label: "Cormorant + Inter", sample: "The Art of Movement" },
];

const TEMPLATE_STYLES = {
  marquee: { bg: "#08080f", text: "#f5f4f0", muted: "rgba(255,255,255,.55)", accent: "#604dff", heroBg: "linear-gradient(180deg, transparent 40%, #08080f)", sectionBg: "rgba(255,255,255,.03)", border: "rgba(255,255,255,.06)", cardBg: "rgba(255,255,255,.04)", headingFont: "'Instrument Serif', Georgia, serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: true },
  editorial: { bg: "#FAFAF7", text: "#1a1a1a", muted: "#777", accent: "#604dff", heroBg: "linear-gradient(180deg, transparent 40%, rgba(250,250,247,.95))", sectionBg: "rgba(0,0,0,.02)", border: "#eee", cardBg: "#fff", headingFont: "'Cormorant Garamond', Georgia, serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: false },
  atelier: { bg: "#f0ebe4", text: "#1a1a1a", muted: "#777", accent: "#604dff", heroBg: "linear-gradient(180deg, transparent 40%, rgba(240,235,228,.95))", sectionBg: "rgba(0,0,0,.02)", border: "rgba(0,0,0,.08)", cardBg: "#fff", headingFont: "'Fraunces', Georgia, serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: false },
  grand: { bg: "#0c0c0c", text: "#f0ebe4", muted: "rgba(255,255,255,.5)", accent: "#C9A84C", heroBg: "linear-gradient(180deg, #0c0c0c 5%, transparent 30%, transparent 70%, #0c0c0c 95%)", sectionBg: "rgba(255,255,255,.03)", border: "rgba(201,168,76,.15)", cardBg: "rgba(255,255,255,.04)", headingFont: "'Instrument Serif', Georgia, serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: true },
  studio: { bg: "#111", text: "#fff", muted: "rgba(255,255,255,.5)", accent: "#604dff", heroBg: "linear-gradient(180deg, rgba(17,17,17,.5), transparent 40%, transparent 60%, #111)", sectionBg: "rgba(255,255,255,.04)", border: "rgba(96,77,255,.12)", cardBg: "#1a1a1a", headingFont: "'Outfit', system-ui, sans-serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: true },
  horizon: { bg: "#0a1628", text: "#e0e8f0", muted: "rgba(224,232,240,.5)", accent: "#00d4ff", heroBg: "linear-gradient(180deg, transparent 40%, #0a1628)", sectionBg: "rgba(0,212,255,.03)", border: "rgba(0,212,255,.1)", cardBg: "rgba(0,212,255,.06)", headingFont: "'Outfit', system-ui, sans-serif", bodyFont: "'Inter', system-ui, sans-serif", monoFont: "'JetBrains Mono', monospace", dark: true, layout: "snap", hasNav: true },
  noir: { bg: "#000", text: "#fff", muted: "rgba(255,255,255,.45)", accent: "#e63946", heroBg: "none", sectionBg: "rgba(255,255,255,.02)", border: "rgba(255,255,255,.08)", cardBg: "rgba(255,255,255,.04)", headingFont: "'Instrument Serif', Georgia, serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: true, layout: "stack" },
  vivid: { bg: "#fff", text: "#1a1a2e", muted: "#666", accent: "#7c3aed", heroBg: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", sectionBg: "rgba(124,58,237,.03)", border: "rgba(124,58,237,.1)", cardBg: "#fff", headingFont: "'Outfit', system-ui, sans-serif", bodyFont: "'DM Sans', system-ui, sans-serif", monoFont: "'JetBrains Mono', monospace", dark: false, layout: "scroll" },
  chronicle: { bg: "#f5f2ed", text: "#2d2a26", muted: "#8a8580", accent: "#8b6914", heroBg: "linear-gradient(180deg, transparent 40%, #f5f2ed)", sectionBg: "rgba(139,105,20,.03)", border: "rgba(139,105,20,.15)", cardBg: "#fff", headingFont: "'Cormorant Garamond', Georgia, serif", bodyFont: "'Inter', system-ui, sans-serif", monoFont: "'JetBrains Mono', monospace", dark: false, layout: "timeline" },
  prism: { bg: "linear-gradient(135deg, #1a0533 0%, #0a1628 50%, #0d1f3c 100%)", text: "#fff", muted: "rgba(255,255,255,.6)", accent: "#a78bfa", heroBg: "none", sectionBg: "rgba(167,139,250,.05)", border: "rgba(167,139,250,.2)", cardBg: "rgba(255,255,255,.08)", headingFont: "'Instrument Serif', Georgia, serif", bodyFont: "'Outfit', system-ui, sans-serif", monoFont: "'DM Mono', monospace", dark: true, layout: "scroll", hasNav: true },
};

// Template-specific section overrides for premium layouts
const getTemplateOverrides = (templateId, prog, ts, fp, accent, brand, I, MOCK_ORG, formatDate, formatCurrency, setArtistView, setApplySubmitted, setApplyForm, setCheckoutQty, setCheckoutComplete, setCheckoutProcessing, titleColor, titleFontFamily, bodyColor, bodyFontFamily, btnBg, btnText, artistAuth, setShowArtistAuthModal, setApplyStep) => {
  const ctaClick = () => { if (prog.model === "B") { setArtistView("catalog"); return; } if (!artistAuth) { setShowArtistAuthModal(true); return; } if (["A","D"].includes(prog.model)) { setArtistView("apply"); setApplySubmitted(false); setApplyForm({ name: artistAuth.name, email: artistAuth.email, age: "", nationality: "", location: "", motivation: "", experience: "" }); if (setApplyStep) setApplyStep(0); } else { setArtistView("checkout"); setCheckoutQty(1); setCheckoutComplete(false); setCheckoutProcessing(false); } };
  const ctaLabel = ({ A: "Apply Now", B: "Browse Workshops", C: "Register", D: "Apply" })[prog.model] || "Register";
  const durDays = Math.ceil((new Date(prog.endDate) - new Date(prog.startDate)) / 86400000);
  const fac = prog.faculty || [];
  const test = prog.testimonials || [];

  const overrides = {
    // ── MARQUEE ─────────────────────────────────────────────
    marquee: {
      hero: () => (
        <section key="hero" className="cvs-parallax-hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : prog.bannerGradient || ts.bg, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, #08080f)" }} />
          {/* floating orbs */}
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,77,255,.12) 0%, transparent 70%)", top: "15%", left: "10%", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 70%)", bottom: "25%", right: "15%", filter: "blur(50px)", pointerEvents: "none" }} />
          {/* dot grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "0 48px 64px", maxWidth: 700 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {(prog.styles || []).slice(0, 3).concat([prog.location?.split(",")[0]]).filter(Boolean).map(t => (
                <span key={t} style={{ padding: "4px 12px", borderRadius: 50, border: "1px solid rgba(255,255,255,.15)", fontSize: 10, letterSpacing: 2, color: "#8b8b9e", fontFamily: ts.monoFont }}>{t.toUpperCase()}</span>
              ))}
            </div>
            <h1 style={{ fontSize: "clamp(40px,5.5vw,72px)", fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, lineHeight: 1.05, margin: 0, color: "#f5f4f0" }}>
              {prog.name.replace(/\d{4}/, "").trim().split(" ").map((w, i, arr) => i === arr.length - 1 ? <em key={i} style={{ color: accent }}>{w}</em> : <span key={i}>{w} </span>)}
            </h1>
            <p style={{ fontSize: 16, color: "#8b8b9e", maxWidth: 420, lineHeight: 1.7, margin: "16px 0 32px", fontWeight: 300, fontFamily: fp.sans }}>{prog.description?.slice(0, 140)}...</p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <button onClick={ctaClick} style={{ background: accent, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans }}>{ctaLabel}</button>
              <span style={{ padding: "6px 14px", borderRadius: 50, background: `${accent}18`, border: `1px solid ${accent}30`, fontSize: 10, letterSpacing: 1, color: accent, fontFamily: ts.monoFont, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2"/></svg>
                VERIFIED ON LANCED
              </span>
            </div>
          </div>
          {/* scroll indicator */}
          <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 2, textAlign: "center" }}>
            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,.2)", margin: "0 auto 6px" }} />
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,.3)", fontFamily: ts.monoFont }}>SCROLL</div>
          </div>
        </section>
      ),
      program: () => (
        <section key="program" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, maxWidth: 1100, margin: "0 auto", borderRadius: 20, overflow: "hidden", border: `1px solid ${ts.border}` }}>
            <div style={{ background: prog.coverImage ? `url(${prog.coverImage})` : ts.sectionBg, backgroundSize: "cover", backgroundPosition: "center", minHeight: 400, transition: "transform 8s ease", cursor: "pointer" }} />
            <div style={{ padding: "48px 40px", background: ts.cardBg }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>THE PROGRAMME</div>
              <h2 style={{ fontSize: 28, fontFamily: fp.serif, fontWeight: 300, margin: "0 0 20px", color: ts.text }}>Where discipline meets artistry</h2>
              <p style={{ fontSize: 15, color: ts.muted, lineHeight: 1.8, fontWeight: 300, fontFamily: fp.sans, marginBottom: 32 }}>{prog.description}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ l: "LEVEL", v: prog.level || "All Levels" }, { l: "DURATION", v: `${durDays} Days` }, { l: "CAPACITY", v: `${prog.capacity} Max` }, { l: "STYLES", v: (prog.styles || []).slice(0, 2).join(", ") }].map(i => (
                  <div key={i.l} style={{ padding: 16, borderRadius: 10, background: "rgba(255,255,255,.03)", border: `1px solid ${ts.border}`, transition: "box-shadow .3s" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 6 }}>{i.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: ts.text, fontFamily: fp.sans }}>{i.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
      faculty: () => {
        if (!fac.length) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>FACULTY</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: fp.serif, fontWeight: 300, margin: "0 0 40px", color: ts.text }}>Learn from the world's best</h2>
              <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 16, scrollSnapType: "x mandatory" }}>
                {fac.map((f, i) => (
                  <div key={i} className="cvs-anim-card" style={{ minWidth: 260, flex: "0 0 260px", borderRadius: 16, overflow: "hidden", background: ts.cardBg, border: `1px solid ${ts.border}`, scrollSnapAlign: "start", transition: "transform .4s, border-color .4s, box-shadow .4s", cursor: "pointer", animationDelay: `${i * 0.1}s` }}>
                    <div style={{ height: "130%", minHeight: 260, background: `url(${f.photo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: ts.text, fontFamily: fp.sans }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: accent, fontFamily: ts.monoFont, letterSpacing: 1, marginTop: 4 }}>{f.role.toUpperCase()}</div>
                      <div style={{ fontSize: 13, color: ts.muted, lineHeight: 1.5, fontWeight: 300, marginTop: 8, fontFamily: fp.sans }}>{f.bio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
      testimonials: () => {
        if (!test.length) return null;
        return (
          <section key="testimonials" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>TESTIMONIALS</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: fp.serif, fontWeight: 300, margin: "0 0 40px", color: ts.text }}>What dancers say</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(test.length, 3)},1fr)`, gap: 20 }}>
                {test.map((t, i) => (
                  <div key={i} className="cvs-anim-card" style={{ padding: 32, borderRadius: 16, background: ts.cardBg, border: `1px solid ${ts.border}`, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ fontSize: 48, color: accent, fontFamily: fp.serif, lineHeight: 1, marginBottom: 8 }}>&ldquo;</div>
                    <div style={{ fontSize: 15, lineHeight: 1.7, color: ts.text, fontStyle: "italic", fontFamily: fp.sans, fontWeight: 300 }}>{t.quote}</div>
                    <div style={{ marginTop: 20, fontSize: 13, fontWeight: 600, color: ts.text, fontFamily: fp.sans }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: ts.muted, fontFamily: ts.monoFont }}>{t.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
      location: () => (
        <section key="location" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>LOCATION</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: fp.serif, fontWeight: 300, margin: "0 0 32px", color: ts.text }}>{prog.venue || "Venue"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", height: 300, background: "linear-gradient(135deg, #1a1a2e, #16213e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", opacity: 0.4 }}>
                  <I n="mapPin" s={32} />
                  <div style={{ fontSize: 11, marginTop: 8, fontFamily: ts.monoFont, letterSpacing: 2 }}>MAP</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ icon: "\uD83D\uDCCD", l: "ADDRESS", v: `${prog.venue}, ${prog.location}` }, { icon: "\uD83D\uDCC5", l: "DATES", v: `${formatDate(prog.startDate)} - ${formatDate(prog.endDate)}` }, { icon: "\u23F0", l: "DAILY SCHEDULE", v: "10:00 - 18:00 (1h lunch break)" }].map((item, i) => (
                  <div key={i} className="cvs-anim-card" style={{ padding: 20, borderRadius: 14, background: ts.cardBg, border: `1px solid ${ts.border}`, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 9, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 4 }}>{item.l}</div>
                        <div style={{ fontSize: 14, color: ts.text, fontFamily: fp.sans }}>{item.v}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),
      pricing: () => {
        const tiers = [];
        if (prog.earlyBirdPrice) tiers.push({ t: "Early Bird", p: formatCurrency(prog.earlyBirdPrice, prog.currency), sub: `Until ${formatDate(prog.earlyBirdCutoff)}` });
        tiers.push({ t: "Standard", p: formatCurrency(prog.basePrice, prog.currency), hl: true, sub: prog.paymentMode === "installments" ? "Installments available" : "Full payment" });
        if (prog.scholarshipTiers?.length > 0) tiers.push({ t: "Scholarship", p: "Apply", sub: `${prog.scholarshipTiers.length} tiers available` });
        const features = ["Full program access", `${durDays}-day training`, "Final showcase", "Certificate"];
        return (
          <section key="pricing" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>PRICING</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: fp.serif, fontWeight: 300, margin: "0 0 40px", color: ts.text }}>Invest in your artistry</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${tiers.length},1fr)`, gap: 20 }}>
                {tiers.map((p, i) => (
                  <div key={i} className="cvs-anim-card" style={{ borderRadius: 20, padding: 32, background: p.hl ? `${accent}12` : ts.cardBg, border: `1px solid ${p.hl ? accent + "40" : ts.border}`, position: "relative", boxShadow: p.hl ? `0 0 40px ${accent}15` : "none", animationDelay: `${i * 0.1}s` }}>
                    {p.hl && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: accent, padding: "3px 14px", borderRadius: "0 0 8px 8px", fontSize: 9, letterSpacing: 2, fontFamily: ts.monoFont, fontWeight: 700, color: "#fff" }}>RECOMMENDED</div>}
                    <div style={{ fontSize: 11, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginTop: p.hl ? 12 : 0, marginBottom: 12 }}>{p.t.toUpperCase()}</div>
                    <div style={{ fontSize: 40, fontFamily: fp.serif, fontWeight: 300, marginBottom: 6, color: ts.text }}>{p.p}</div>
                    <div style={{ fontSize: 12, color: ts.muted, marginBottom: 20, fontFamily: fp.sans }}>{p.sub}</div>
                    {features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontSize: 13, color: ts.muted, fontWeight: 300, fontFamily: fp.sans }}>{f}</span>
                      </div>
                    ))}
                    <button style={{ width: "100%", marginTop: 20, padding: "12px", borderRadius: 50, background: p.hl ? accent : "transparent", color: p.hl ? "#fff" : ts.muted, border: p.hl ? "none" : `1px solid ${ts.border}`, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans }}>Select</button>
                  </div>
                ))}
              </div>
              {prog.scholarshipTiers?.length > 0 && (
                <div className="cvs-anim-card" style={{ marginTop: 24, padding: 24, borderRadius: 16, background: "rgba(201,168,76,.06)", border: "1px solid rgba(201,168,76,.15)", display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{"\u2B50"}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: ts.text, fontFamily: fp.sans }}>Scholarships Available</div>
                    <div style={{ fontSize: 13, color: ts.muted, fontFamily: fp.sans }}>{prog.scholarshipTiers.length} scholarship tiers offered for this program</div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      },
      cta: () => (
        <section key="cta" className="cvs-anim-section" style={{ padding: "100px 48px", textAlign: "center", position: "relative", background: ts.bg }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${accent}12, transparent 60%)` }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontFamily: fp.serif, fontWeight: 300, margin: "0 0 16px", color: ts.text }}>
              Ready to <em style={{ color: accent }}>transform?</em>
            </h2>
            <p style={{ fontSize: 15, color: ts.muted, maxWidth: 400, margin: "0 auto 28px", fontFamily: fp.sans }}>Secure your spot in this transformative experience.</p>
            <button onClick={ctaClick} className="cvs-anim-btn" style={{ background: accent, color: "#fff", border: "none", padding: "16px 48px", borderRadius: 50, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans }}>{ctaLabel}</button>
            <div style={{ marginTop: 16 }}>
              <span style={{ padding: "6px 14px", borderRadius: 50, background: `${accent}18`, border: `1px solid ${accent}30`, fontSize: 10, letterSpacing: 1, color: accent, fontFamily: ts.monoFont, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2"/></svg>
                VERIFIED ON LANCED
              </span>
            </div>
          </div>
        </section>
      ),
    },

    // ── EDITORIAL ───────────────────────────────────────────
    editorial: {
      hero: () => (
        <section key="hero" className="cvs-anim-section" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: ts.bg }}>
          <div style={{ padding: "80px 56px 80px 72px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ padding: "6px 16px", borderRadius: 50, background: `${accent}10`, border: `1px solid ${accent}20`, fontSize: 10, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, display: "inline-block", alignSelf: "flex-start", marginBottom: 24 }}>{prog.type?.toUpperCase() || "PROGRAM"}</div>
            <h1 style={{ fontSize: "clamp(40px,5vw,72px)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, lineHeight: 1.05, margin: 0, color: ts.text }}>
              {prog.name.replace(/\d{4}/, "").trim()}
            </h1>
            <p style={{ fontSize: 16, color: ts.muted, maxWidth: 420, lineHeight: 1.7, margin: "20px 0 28px", fontWeight: 300, fontFamily: fp.sans }}>{prog.description?.slice(0, 150)}...</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              {(prog.styles || []).slice(0, 3).concat([prog.location?.split(",")[0]]).filter(Boolean).map(t => (
                <span key={t} style={{ padding: "6px 14px", borderRadius: 50, background: "#f0ebe4", fontSize: 11, fontWeight: 500, color: ts.text, fontFamily: fp.sans }}>{t}</span>
              ))}
            </div>
            <button onClick={ctaClick} style={{ background: accent, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans, alignSelf: "flex-start" }}>{ctaLabel}</button>
          </div>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div className="cvs-anim-section" style={{ position: "absolute", inset: 0, background: prog.coverImage ? `url(${prog.coverImage})` : prog.bannerGradient || "#e8e4f0", backgroundSize: "cover", backgroundPosition: "center", clipPath: "inset(0 0 0 0)" }} />
          </div>
        </section>
      ),
      program: () => (
        <section key="program" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 16 }}>THE PROGRAMME</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
              {[{ phase: "Phase I", t: "Foundation", desc: "Classical technique and body conditioning fundamentals" }, { phase: "Phase II", t: "Exploration", desc: "Improvisation, release work, and creative process" }, { phase: "Phase III", t: "Creation", desc: "Choreographic workshops and collaborative projects" }, { phase: "Phase IV", t: "Performance", desc: "Rehearsal, stage craft, and final showcase" }].map((p, i) => (
                <div key={i} className="cvs-anim-card" style={{ padding: "24px 20px", borderTop: `3px solid ${i === 0 ? accent : ts.border}`, transition: "border-color .3s", cursor: "pointer", animationDelay: `${i * 0.1}s` }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 8 }}>{p.phase}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: ts.text, fontFamily: fp.sans, marginBottom: 8 }}>{p.t}</div>
                  <div style={{ fontSize: 13, color: ts.muted, lineHeight: 1.6, fontFamily: fp.sans }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      faculty: () => {
        if (!fac.length) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>MENTORS</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, margin: "0 0 40px", color: ts.text }}>World-class faculty</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(fac.length, 3)}, 1fr)`, gap: 32 }}>
                {fac.slice(0, 3).map((f, i) => (
                  <div key={i} className="cvs-anim-card" style={{ display: "flex", gap: 20, animationDelay: `${i * 0.12}s` }}>
                    <img src={f.photo} alt={f.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: ts.text, fontFamily: fp.sans }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: accent, fontFamily: ts.monoFont, letterSpacing: 1, marginTop: 4 }}>{f.role.toUpperCase()}</div>
                      <div style={{ fontSize: 13, color: ts.muted, lineHeight: 1.5, fontWeight: 300, marginTop: 8, fontFamily: fp.sans }}>{f.bio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
      trailer: () => (
        <section key="trailer" className="cvs-anim-section" style={{ padding: "0 48px 80px", background: ts.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 12, height: 500 }}>
              <div style={{ gridRow: "1 / 3", borderRadius: 16, overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : "#e8e4f0", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ borderRadius: 16, overflow: "hidden", background: fac[0]?.photo ? `url(${fac[0].photo})` : "#ddd", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ borderRadius: 16, overflow: "hidden", background: fac[1]?.photo ? `url(${fac[1].photo})` : "#ccc", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ borderRadius: 16, overflow: "hidden", background: fac[2]?.photo ? `url(${fac[2].photo})` : "#ddd", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg, #e8e4f0, #d5cee8)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div className="cvs-tpl-play"><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 20,12 8,19" /></svg></div>
              </div>
            </div>
          </div>
        </section>
      ),
      cta: () => (
        <section key="cta" className="cvs-anim-section" style={{ padding: 0, background: ts.bg }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 400 }}>
            <div style={{ background: "#1a1a1a", padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, margin: "0 0 16px", color: "#f5f4f0" }}>Begin your journey</h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 28, maxWidth: 380, fontFamily: fp.sans }}>Secure your spot in this transformative experience.</p>
              <button onClick={ctaClick} style={{ background: accent, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans, alignSelf: "flex-start" }}>{ctaLabel}</button>
            </div>
            <div style={{ background: prog.coverImage ? `url(${prog.coverImage})` : "#e8e4f0", backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>
        </section>
      ),
    },

    // ── ATELIER ──────────────────────────────────────────────
    atelier: {
      hero: () => (
        <section key="hero" className="cvs-anim-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: ts.bg, padding: "80px 72px" }}>
          {/* asymmetric background image */}
          <div className="cvs-anim-section" style={{ position: "absolute", width: "55%", height: "85%", right: "-2%", top: "8%", borderRadius: 20, overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : prog.bannerGradient || "#d5cee8", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 500 }}>
            <div style={{ padding: "6px 16px", borderRadius: 50, background: `${accent}10`, border: `1px solid ${accent}20`, fontSize: 10, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, display: "inline-block", marginBottom: 24 }}>{prog.type?.toUpperCase() || "PROGRAM"}</div>
            <h1 style={{ fontSize: "clamp(40px,5vw,68px)", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, lineHeight: 1.05, margin: 0, color: ts.text }}>
              {prog.name.replace(/\d{4}/, "").trim()}
            </h1>
            <div style={{ width: 48, height: 3, background: accent, margin: "20px 0" }} />
            <p style={{ fontSize: 16, color: ts.muted, lineHeight: 1.7, marginBottom: 32, fontWeight: 300, fontFamily: fp.sans }}>{prog.description?.slice(0, 150)}...</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={ctaClick} style={{ background: accent, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans }}>{ctaLabel}</button>
              <button style={{ background: "transparent", color: ts.text, border: `1px solid ${ts.border}`, padding: "14px 28px", borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: fp.sans }}>Watch Trailer</button>
            </div>
          </div>
        </section>
      ),
      trailer: () => (
        <section key="trailer" className="cvs-anim-section" style={{ padding: "0 48px 80px", background: ts.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "start" }}>
              {[0, 60, 120].map((offset, i) => (
                <div key={i} style={{ paddingTop: offset, transition: "transform .5s" }}>
                  <div style={{ borderRadius: 16, overflow: "hidden", height: 320, background: (fac[i]?.photo || prog.coverImage) ? `url(${fac[i]?.photo || prog.coverImage})` : "#d5cee8", backgroundSize: "cover", backgroundPosition: "center" }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      program: () => (
        <section key="program" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, maxWidth: 1100, margin: "0 auto" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont }}>PHILOSOPHY</div>
            </div>
            <div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, margin: "0 0 20px", color: ts.text }}>Where intention meets surprise</h2>
              <p style={{ fontSize: 15, color: ts.muted, lineHeight: 1.8, fontWeight: 300, fontFamily: fp.sans }}>{prog.description}</p>
            </div>
          </div>
        </section>
      ),
      faculty: () => {
        if (!fac.length) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>ARTISTS</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, margin: "0 0 40px", color: ts.text }}>The creative minds</h2>
              {/* overlap layout: image + floating cards */}
              <div style={{ position: "relative", minHeight: 420 }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: "65%", height: "100%", borderRadius: 20, overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : "#d5cee8", backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "relative", marginLeft: "50%", display: "flex", flexDirection: "column", gap: 16, padding: "24px 0" }}>
                  {fac.slice(0, 3).map((f, i) => (
                    <div key={i} className="cvs-anim-card" style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 8px 32px rgba(0,0,0,.08)", display: "flex", gap: 16, alignItems: "center", transition: "transform .3s", cursor: "pointer", animationDelay: `${i * 0.12}s` }}>
                      <img src={f.photo} alt={f.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: ts.text, fontFamily: fp.sans }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: accent, fontFamily: ts.monoFont, letterSpacing: 1 }}>{f.role.toUpperCase()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      },
      cta: () => (
        <section key="cta" className="cvs-anim-section" style={{ padding: "0 48px 80px", background: ts.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", background: prog.coverImage ? `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.6)),url(${prog.coverImage})` : "#1a1a1a", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div style={{ textAlign: "center", position: "relative", zIndex: 2, padding: 48 }}>
              <h2 style={{ fontSize: "clamp(28px,3vw,44px)", fontFamily: "'Fraunces', Georgia, serif", fontWeight: 300, margin: "0 0 20px", color: "#fff" }}>Begin your creative journey</h2>
              <button onClick={ctaClick} style={{ background: accent, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans }}>{ctaLabel}</button>
            </div>
          </div>
        </section>
      ),
    },

    // ── GRAND ────────────────────────────────────────────────
    grand: {
      hero: () => (
        <section key="hero" className="cvs-parallax-hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : prog.bannerGradient || "#0c0c0c", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
          {/* letterbox bars */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(180deg, #0c0c0c 40%, transparent)", zIndex: 1 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(0deg, #0c0c0c 40%, transparent)", zIndex: 1 }} />
          <div style={{ position: "relative", textAlign: "center", zIndex: 2, padding: "0 48px" }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: "#C9A84C", fontFamily: ts.monoFont, marginBottom: 24 }}>{MOCK_ORG.name.toUpperCase()} PRESENTS</div>
            <h1 style={{ fontSize: "clamp(48px,7vw,96px)", fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, lineHeight: 0.95, margin: 0, color: "#f0ebe4" }}>
              {prog.name.replace(/\d{4}/, "").trim()}
            </h1>
            <div style={{ fontSize: 20, fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: "italic", color: "#C9A84C", margin: "16px 0 40px" }}>{prog.location} {prog.startDate?.slice(0, 4)}</div>
            <div className="cvs-tpl-play" style={{ margin: "0 auto", borderColor: "#C9A84C" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="#f0ebe4"><polygon points="8,5 20,12 8,19" /></svg></div>
            <div style={{ fontSize: 10, letterSpacing: 3, fontFamily: ts.monoFont, marginTop: 12, opacity: 0.5, color: "#f0ebe4" }}>PLAY TRAILER</div>
          </div>
        </section>
      ),
      program: () => (
        <section key="program" className="cvs-anim-section" style={{ padding: "60px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, borderTop: `1px solid rgba(201,168,76,.15)`, borderBottom: `1px solid rgba(201,168,76,.15)` }}>
              {[{ l: "DATES", v: `${formatDate(prog.startDate)} - ${formatDate(prog.endDate)}` }, { l: "VENUE", v: prog.venue || "TBA" }, { l: "LEVEL", v: prog.level || "All Levels" }, { l: "CAPACITY", v: `${prog.capacity}` }, { l: "LOCATION", v: prog.location?.split(",")[0] }].map((item, i) => (
                <div key={i} style={{ padding: "24px 20px", borderRight: i < 4 ? `1px solid rgba(201,168,76,.15)` : "none", textAlign: "center", transition: "background .3s", cursor: "pointer" }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: "#C9A84C", fontFamily: ts.monoFont, marginBottom: 8 }}>{item.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: ts.text, fontFamily: fp.sans }}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      trailer: () => (
        <section key="trailer" className="cvs-anim-section" style={{ padding: "0 48px 80px", background: ts.bg }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ borderRadius: 12, overflow: "hidden", background: fac[0]?.photo ? `url(${fac[0].photo})` : "#1a1a1a", backgroundSize: "cover", backgroundPosition: "center", minHeight: 360 }} />
            <div style={{ borderRadius: 12, overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : "#1a1a1a", backgroundSize: "cover", backgroundPosition: "center", minHeight: 360 }} />
          </div>
        </section>
      ),
      faculty: () => {
        if (!fac.length) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ width: 48, height: 1, background: "#C9A84C", margin: "0 auto 24px" }} />
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#C9A84C", fontFamily: ts.monoFont, marginBottom: 12, textAlign: "center" }}>THE CAST</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, margin: "0 0 48px", color: ts.text, textAlign: "center" }}>Distinguished artists</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(fac.length, 5)}, 1fr)`, gap: 32, justifyItems: "center" }}>
                {fac.map((f, i) => (
                  <div key={i} className="cvs-anim-card" style={{ textAlign: "center", animationDelay: `${i * 0.1}s` }}>
                    <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto 16px", border: i === 0 ? "2px solid #C9A84C" : `1px solid ${ts.border}`, transition: "transform .3s", cursor: "pointer" }}>
                      <img src={f.photo} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: ts.text, fontFamily: fp.sans }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "#C9A84C", fontFamily: ts.monoFont, letterSpacing: 1, marginTop: 4 }}>{f.role.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
      schedule: () => (
        <section key="schedule" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#C9A84C", fontFamily: ts.monoFont, marginBottom: 12, textAlign: "center" }}>TOUR DATES</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, margin: "0 0 40px", color: ts.text, textAlign: "center" }}>Upcoming performances</h2>
            {[{ city: "Amsterdam", date: formatDate(prog.startDate), venue: prog.venue || "Main Stage" }, { city: "Rotterdam", date: "TBA", venue: "Theatre" }, { city: "Brussels", date: "TBA", venue: "Grand Hall" }].map((item, i) => (
              <div key={i} className="cvs-anim-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderBottom: `1px solid rgba(201,168,76,.1)`, transition: "padding-left .3s", cursor: "pointer", animationDelay: `${i * 0.1}s` }}>
                <div>
                  <div style={{ fontSize: 22, fontFamily: "'Instrument Serif', Georgia, serif", color: ts.text }}>{item.city}</div>
                  <div style={{ fontSize: 12, color: ts.muted, fontFamily: ts.monoFont, marginTop: 4 }}>{item.venue}</div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: ts.muted, fontFamily: ts.monoFont }}>{item.date}</span>
                  <button style={{ background: "transparent", color: "#C9A84C", border: `1px solid rgba(201,168,76,.3)`, padding: "8px 20px", borderRadius: 50, fontSize: 11, letterSpacing: 2, fontFamily: ts.monoFont, cursor: "pointer", textTransform: "uppercase" }}>Tickets</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
      cta: () => (
        <section key="cta" className="cvs-anim-section" style={{ padding: "100px 48px", textAlign: "center", position: "relative", background: ts.bg }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(201,168,76,.08), transparent 60%)" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 300, margin: "0 0 16px", color: ts.text }}>
              Experience the <em style={{ color: "#C9A84C" }}>extraordinary</em>
            </h2>
            <p style={{ fontSize: 15, color: ts.muted, maxWidth: 400, margin: "0 auto 28px", fontFamily: fp.sans }}>An evening of artistry and excellence awaits.</p>
            <button onClick={ctaClick} className="cvs-anim-btn" style={{ background: "#C9A84C", color: "#0c0c0c", border: "none", padding: "16px 48px", borderRadius: 50, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: fp.sans }}>{ctaLabel}</button>
          </div>
        </section>
      ),
    },

    // ── STUDIO ───────────────────────────────────────────────
    studio: {
      hero: () => (
        <section key="hero" className="cvs-parallax-hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: prog.coverImage ? `url(${prog.coverImage})` : prog.bannerGradient || "#111", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,.5), transparent 40%, transparent 60%, #111)" }} />
          {/* top nav bar */}
          <div style={{ position: "relative", zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px" }}>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 2, color: "#fff", fontFamily: "'Outfit', system-ui, sans-serif" }}>{MOCK_ORG.name.toUpperCase().slice(0, 3)}</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ padding: "4px 12px", borderRadius: 50, background: `${accent}20`, fontSize: 10, letterSpacing: 1, color: accent, fontFamily: ts.monoFont }}>{prog.type?.toUpperCase()}</span>
              <button onClick={ctaClick} style={{ background: accent, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 50, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>REGISTER</button>
            </div>
          </div>
          {/* bottom content */}
          <div style={{ marginTop: "auto", position: "relative", zIndex: 2, padding: "0 48px 64px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ maxWidth: 600 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 16 }}>{(prog.styles || []).join(" / ").toUpperCase()}</div>
              <h1 style={{ fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, lineHeight: 0.95, margin: 0, letterSpacing: -2, color: "#fff", fontFamily: "'Outfit', system-ui, sans-serif" }}>
                DANCE.<br /><span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>CREATE.</span><br />MOVE.
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", maxWidth: 380, lineHeight: 1.7, margin: "20px 0 0", fontWeight: 300, fontFamily: "'Outfit', system-ui, sans-serif" }}>{prog.description?.slice(0, 120)}...</p>
            </div>
            <div className="cvs-tpl-play" style={{ marginBottom: 8, flexShrink: 0 }}><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 20,12 8,19" /></svg></div>
          </div>
        </section>
      ),
      trailer: () => (
        <section key="trailer" className="cvs-anim-section" style={{ padding: "0", background: ts.bg }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {["Contemporary", "Hip-Hop", "Improvisation"].map((cat, i) => (
              <div key={i} style={{ position: "relative", paddingBottom: "56%", background: (fac[i]?.photo || prog.coverImage) ? `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.6)),url(${fac[i]?.photo || prog.coverImage})` : "#1a1a1a", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 1 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 4 }}>{cat.toUpperCase()}</div>
                </div>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                  <div className="cvs-tpl-play" style={{ width: 48, height: 48, fontSize: 14 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 20,12 8,19" /></svg></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ),
      program: () => (
        <section key="program" className="cvs-anim-section" style={{ padding: "60px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {[{ n: `${durDays}`, l: "DAYS" }, { n: prog.capacity ? `${prog.capacity}` : "\u221E", l: prog.capacity ? "SPOTS" : "OPEN" }, { n: `${fac.length}`, l: "TEACHERS" }, { n: `${(prog.styles || []).length * 3}+`, l: "CLASSES" }].map((s, i) => (
                <div key={i} className="cvs-anim-card" style={{ textAlign: "center", padding: 24, animationDelay: `${i * 0.1}s` }}>
                  <div style={{ fontSize: 44, fontWeight: 800, color: accent, fontFamily: "'Outfit', system-ui, sans-serif" }}>{s.n}</div>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: ts.muted, fontFamily: ts.monoFont, marginTop: 8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
      faculty: () => {
        if (!fac.length) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>TEACHERS</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, margin: "0 0 40px", color: ts.text, fontFamily: "'Outfit', system-ui, sans-serif" }}>Your instructors</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(fac.length, 5)}, 1fr)`, gap: 16 }}>
                {fac.map((f, i) => (
                  <div key={i} className="cvs-anim-card" style={{ borderRadius: 16, overflow: "hidden", background: ts.cardBg, border: `1px solid ${ts.border}`, transition: "transform .3s, box-shadow .3s", cursor: "pointer", animationDelay: `${i * 0.08}s` }}>
                    <div style={{ paddingBottom: "130%", background: `url(${f.photo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div style={{ padding: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: ts.text, fontFamily: "'Outfit', system-ui, sans-serif" }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: accent, fontFamily: ts.monoFont, letterSpacing: 1, marginTop: 2 }}>{f.role.toUpperCase()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
      pricing: () => {
        const tiers = [];
        if (prog.earlyBirdPrice) tiers.push({ t: "Early Bird", p: formatCurrency(prog.earlyBirdPrice, prog.currency), sub: `Until ${formatDate(prog.earlyBirdCutoff)}` });
        tiers.push({ t: "Standard", p: formatCurrency(prog.basePrice, prog.currency), hl: true, sub: prog.paymentMode === "installments" ? "Installments available" : "Full payment" });
        return (
          <section key="pricing" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>PRICING</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, margin: "0 0 40px", color: ts.text, fontFamily: "'Outfit', system-ui, sans-serif" }}>Lock in your spot</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${tiers.length}, 1fr)`, gap: 20 }}>
                {tiers.map((p, i) => (
                  <div key={i} className="cvs-anim-card" style={{ borderRadius: 20, padding: 36, background: ts.cardBg, border: p.hl ? `2px solid ${accent}` : `1px solid ${ts.border}`, textAlign: "center", animationDelay: `${i * 0.1}s` }}>
                    <div style={{ fontSize: 11, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 16 }}>{p.t.toUpperCase()}</div>
                    <div style={{ fontSize: 48, fontWeight: 800, color: ts.text, fontFamily: "'Outfit', system-ui, sans-serif", marginBottom: 8 }}>{p.p}</div>
                    <div style={{ fontSize: 13, color: ts.muted, marginBottom: 24, fontFamily: fp.sans }}>{p.sub}</div>
                    <button onClick={ctaClick} style={{ width: "100%", padding: "14px", borderRadius: 50, background: p.hl ? accent : "transparent", color: p.hl ? "#fff" : ts.muted, border: p.hl ? "none" : `1px solid ${ts.border}`, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', system-ui, sans-serif" }}>SELECT</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
      cta: () => (
        <section key="cta" className="cvs-anim-section" style={{ padding: "100px 48px", textAlign: "center", position: "relative", background: ts.bg }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${accent}10, transparent 60%)` }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "clamp(32px,4vw,56px)", fontWeight: 900, lineHeight: 1.0, color: ts.text, fontFamily: "'Outfit', system-ui, sans-serif" }}>
              DON&apos;T JUST <span style={{ color: accent }}>WATCH.</span><br />MOVE.
            </div>
            <button onClick={ctaClick} className="cvs-anim-btn" style={{ background: accent, color: "#fff", border: "none", padding: "16px 48px", borderRadius: 50, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 28, fontFamily: "'Outfit', system-ui, sans-serif" }}>{ctaLabel}</button>
          </div>
        </section>
      ),
    },

    horizon: {
      wrapper: (children) => (
        <div style={{ position: "relative" }}>
          <nav className="cvs-horizon-nav">
            {children.filter(Boolean).map((_, i) => <div key={i} className={`cvs-horizon-dot ${i === 0 ? "active" : ""}`} />)}
          </nav>
          <div>{children}</div>
        </div>
      ),
      hero: () => (
        <section key="hero" className="cvs-anim-section" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", background: ts.bg }}>
          <div style={{ padding: "80px 48px 80px 72px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: accent, fontFamily: ts.monoFont, marginBottom: 16 }}>PROGRAM</div>
            <h1 style={{ fontSize: "clamp(36px,4vw,56px)", fontFamily: fp.sans, fontWeight: 700, lineHeight: 1.1, color: ts.text, marginBottom: 20 }}>{prog.name}</h1>
            <p style={{ fontSize: 16, color: ts.muted, lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>{prog.description?.slice(0, 150)}...</p>
            <button className="cvs-anim-btn" style={{ background: accent, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>{({ A: "Apply Now", B: "Browse Workshops", C: "Register", D: "Apply" })[prog.model] || "Register"}</button>
          </div>
          <div style={{ background: prog.coverImage ? `url(${prog.coverImage})` : ts.heroBg, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${ts.bg}, transparent 30%)` }} />
          </div>
        </section>
      ),
    },
    noir: {
      hero: () => (
        <section key="hero" className="cvs-noir-hero" style={{ background: "#000", position: "relative" }}>
          <div style={{ textAlign: "center", padding: "0 48px", maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: accent, fontFamily: ts.monoFont, marginBottom: 32 }}>PRESENTS</div>
            <h1 className="cvs-noir-hero h1" style={{ fontSize: "clamp(48px,8vw,120px)", fontFamily: fp.serif, fontWeight: 300, lineHeight: .9, color: "#fff", margin: 0 }}>
              {prog.name.replace(/\d{4}/, "").trim()}
            </h1>
            <div style={{ width: 60, height: 2, background: accent, margin: "32px auto" }} />
            <p style={{ fontSize: 16, color: ts.muted, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>{prog.description?.slice(0, 120)}...</p>
            <button className="cvs-anim-btn" style={{ background: "transparent", color: "#fff", border: `1px solid ${accent}`, padding: "14px 40px", borderRadius: 0, fontSize: 14, fontWeight: 500, cursor: "pointer", letterSpacing: 2, textTransform: "uppercase" }}>{({ A: "APPLY", B: "BROWSE", C: "REGISTER", D: "APPLY" })[prog.model] || "REGISTER"}</button>
          </div>
        </section>
      ),
    },
    vivid: {
      hero: () => (
        <section key="hero" className="cvs-vivid-mesh" style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 48, position: "relative" }}>
          <div style={{ background: "rgba(255,255,255,.9)", backdropFilter: "blur(20px)", borderRadius: 32, padding: "48px 56px", maxWidth: 600, textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,.1)" }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
              {(prog.styles || []).slice(0, 3).map(s => <span key={s} style={{ padding: "4px 14px", borderRadius: 50, background: `${accent}15`, fontSize: 11, fontWeight: 600, color: accent }}>{s}</span>)}
            </div>
            <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontFamily: fp.sans, fontWeight: 700, lineHeight: 1.1, color: ts.text, margin: "0 0 16px" }}>{prog.name}</h1>
            <p style={{ fontSize: 15, color: ts.muted, lineHeight: 1.7, marginBottom: 28 }}>{prog.description?.slice(0, 120)}...</p>
            <button className="cvs-anim-btn" style={{ background: `linear-gradient(135deg, ${accent}, #f093fb)`, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{({ A: "Apply Now", B: "Browse Workshops", C: "Register", D: "Apply" })[prog.model] || "Register"}</button>
          </div>
        </section>
      ),
      faculty: () => {
        const fac = prog.faculty || [];
        if (!fac.length) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: 32, fontFamily: fp.sans, fontWeight: 700, marginBottom: 40, color: ts.text }}>Meet the Faculty</h2>
              <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
                {fac.map((f, i) => (
                  <div key={i} className="cvs-vivid-polaroid cvs-anim-bounce" style={{ "--rot": `${(i % 2 === 0 ? -3 : 3) + Math.random() * 2}deg`, width: 200, animationDelay: `${i * 0.15}s` }}>
                    <img src={f.photo} alt={f.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                    <div style={{ padding: "12px 4px 4px", textAlign: "center" }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: accent }}>{f.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },
    },
    chronicle: {
      hero: () => (
        <section key="hero" className="cvs-anim-section" style={{ minHeight: "80vh", display: "grid", gridTemplateColumns: "35% 1fr", background: ts.bg, position: "relative" }}>
          <div style={{ background: prog.coverImage ? `url(${prog.coverImage})` : "linear-gradient(135deg, #d4c5a9, #c4b393)", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ padding: "80px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 16 }}>A JOURNEY</div>
            <h1 style={{ fontSize: "clamp(32px,4vw,56px)", fontFamily: fp.serif, fontWeight: 400, lineHeight: 1.15, color: ts.text, margin: "0 0 20px" }}>{prog.name}</h1>
            <p style={{ fontSize: 16, color: ts.muted, lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>{prog.description}</p>
            <div style={{ display: "flex", gap: 12, fontSize: 13, color: ts.muted }}>
              <span>{formatDate(prog.startDate)} - {formatDate(prog.endDate)}</span>
              <span>·</span>
              <span>{prog.location}</span>
            </div>
          </div>
        </section>
      ),
      wrapper: (children) => (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(139,105,20,.1)", transform: "translateX(-50%)", zIndex: 0 }} />
          {children}
        </div>
      ),
    },
    prism: {
      wrapper: (children) => (
        <div style={{ position: "relative", background: "linear-gradient(135deg, #1a0533 0%, #0a1628 50%, #0d1f3c 100%)", minHeight: "100vh" }}>
          <nav className="cvs-prism-nav">
            {["About", "Faculty", "Pricing", "Apply"].map(label => (
              <a key={label}>{label}</a>
            ))}
          </nav>
          {children}
        </div>
      ),
      hero: () => (
        <section key="hero" className="cvs-anim-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 48px", position: "relative" }}>
          <div className="cvs-prism-glow" style={{ background: accent, top: "20%", left: "20%" }} />
          <div className="cvs-prism-glow" style={{ background: "#00d4ff", bottom: "20%", right: "20%" }} />
          <div className="cvs-prism-glass" style={{ maxWidth: 700, textAlign: "center", position: "relative", animation: "cvsGlowPulse 4s ease infinite" }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: accent, fontFamily: ts.monoFont, marginBottom: 16 }}>{(prog.styles || []).join(" · ").toUpperCase()}</div>
            <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontFamily: fp.serif, fontWeight: 300, lineHeight: 1.1, color: "#fff", margin: "0 0 20px" }}>{prog.name}</h1>
            <p style={{ fontSize: 16, color: ts.muted, lineHeight: 1.7, marginBottom: 32 }}>{prog.description?.slice(0, 150)}...</p>
            <button className="cvs-anim-btn" style={{ background: `linear-gradient(135deg, ${accent}, #00d4ff)`, color: "#fff", border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{({ A: "Apply Now", B: "Browse Workshops", C: "Register", D: "Apply" })[prog.model] || "Register"}</button>
          </div>
        </section>
      ),
    },
  };
  return overrides[templateId] || {};
};

const MESSAGE_TEMPLATES = [
  { id: "mt1", name: "Welcome Message", subject: "Welcome to {{program_name}}!", body: "Dear {{participant_name}},\n\nWe're thrilled to confirm your participation in {{program_name}}. Here are the key details:\n\nDates: {{start_date}} - {{end_date}}\nLocation: {{venue}}, {{location}}\n\nMore information will follow soon.\n\nBest regards,\n{{org_name}}" },
  { id: "mt2", name: "Payment Reminder", subject: "Payment Reminder \u2014 {{program_name}}", body: "Dear {{participant_name}},\n\nThis is a friendly reminder that your payment of {{amount}} is due on {{due_date}}.\n\nPlease complete your payment to secure your spot.\n\nBest regards,\n{{org_name}}" },
  { id: "mt3", name: "Schedule Update", subject: "Schedule Update \u2014 {{program_name}}", body: "Dear {{participant_name}},\n\nWe'd like to share an important schedule update for {{program_name}}.\n\n{{message}}\n\nBest regards,\n{{org_name}}" },
];

// ============================================================
// ICON COMPONENT
// ============================================================

const Icon = ({ name, size = 18 }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    copy: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    inbox: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    heart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    moon: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    grid: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    list: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    image: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    arrowLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
    share: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    info: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    moreV: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
    logOut: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    dollar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    ticket: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v5a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-5a3 3 0 0 1 0-6V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
    creditCard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    receipt: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    award: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    percent: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    barChart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    clipboardList: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="10" y1="12" x2="16" y2="12"/><line x1="10" y1="16" x2="16" y2="16"/><circle cx="7" cy="12" r="0.5" fill="currentColor"/><circle cx="7" cy="16" r="0.5" fill="currentColor"/></svg>,
    userCheck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
    userX: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>,
    alertCircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    checkCircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    xCircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    externalLink: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
    tag: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    gift: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    briefcase: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    refreshCw: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    trendingUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    fileText: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    shoppingCart: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  };
  return icons[name] || null;
};

// ============================================================
// CSS
// ============================================================

const ac = "#604DFF";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
:root{--ac:${ac};--bg:#F8F7FF;--sf:#FFF;--tx:#0A0A0B;--g1:#F5F4FB;--g2:#E8E6F0;--g3:#D1D0D9;--g4:#98989F;--g5:#6E6E76;--g6:#48484D;--red:#FF4757;--green:#1DB954;--amber:#F5A623;--sans:'DM Sans',system-ui,sans-serif;--serif:'Playfair Display',Georgia,serif;--mono:'JetBrains Mono',monospace;--sb-w:240px;--sb-wc:64px}
body{font-family:var(--sans);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

/* Dark mode */
.dark{--bg:#0D0D12;--sf:#17171C;--tx:#E4E3EA;--g1:#1C1C24;--g2:#28283A;--g3:#3A3A4C;--g4:#7A7A8C;--g5:#A0A0B0;--g6:#D0D0DA;--ac:#7A66FF;--red:#FF6B7A;--green:#2ECC71;--amber:#FFB84D}

/* Animations */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes slideInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes bannerShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

/* Auth page */
.auth-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:#0A0A0B;background-image:radial-gradient(ellipse at 25% 40%,rgba(96,77,255,.15) 0%,transparent 60%),radial-gradient(ellipse at 75% 70%,rgba(96,77,255,.08) 0%,transparent 50%)}
.auth-card{width:420px;background:rgba(255,255,255,.04);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:44px 36px;text-align:center;animation:scaleIn .3s ease}
.auth-card .auth-logo{width:48px;height:48px;background:linear-gradient(135deg,#7A66FF,#4A35E0);border-radius:14px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:22px;margin-bottom:24px;box-shadow:0 4px 16px rgba(96,77,255,.3)}
.auth-card h2{font-family:var(--serif);font-size:28px;font-weight:400;color:#fff;margin-bottom:6px}
.auth-card .auth-sub{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:28px;line-height:1.5}
.auth-card input{width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#fff;font-family:var(--sans);font-size:14px;margin-bottom:10px;outline:none;transition:border .2s}
.auth-card input::placeholder{color:rgba(255,255,255,.2)}
.auth-card input:focus{border-color:var(--ac)}
.auth-btn{width:100%;padding:13px;border-radius:10px;border:none;background:linear-gradient(135deg,#7A66FF,#4A35E0);color:#fff;font-family:var(--sans);font-size:14px;font-weight:600;cursor:pointer;margin-top:6px;transition:all .2s;box-shadow:0 4px 16px rgba(96,77,255,.25)}
.auth-btn:hover{filter:brightness(1.1);transform:translateY(-1px)}
.auth-switch{margin-top:20px;font-size:12px;color:rgba(255,255,255,.25)}
.auth-switch a{color:var(--ac);cursor:pointer;text-decoration:none;font-weight:600}
.auth-switch a:hover{text-decoration:underline}

/* Shell + Sidebar */
.shell{display:flex;min-height:100vh;background:var(--bg);color:var(--tx)}
.sidebar{width:var(--sb-w);background:var(--bg);border-right:none;box-shadow:1px 0 0 0 rgba(96,77,255,.06);padding:20px 12px;display:flex;flex-direction:column;position:fixed;top:0;bottom:0;left:0;z-index:50;transition:width .25s cubic-bezier(.4,0,.2,1);overflow:visible}
.sidebar.collapsed{width:var(--sb-wc)}
.sidebar .sb-header{display:flex;align-items:center;padding:0 8px;margin-bottom:24px;white-space:nowrap;overflow:hidden}
.sidebar .sb-logo{display:flex;align-items:center;gap:10px;white-space:nowrap;overflow:hidden}
.sidebar .sb-logo .sb-logo-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--ac),#4A35E0);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;flex-shrink:0;box-shadow:0 2px 12px rgba(96,77,255,.3)}
.sidebar .sb-logo .sb-logo-text{font-size:14px;font-weight:700;color:var(--tx);overflow:hidden;line-height:1.3}
.sidebar .sb-logo .sb-logo-text span{display:block;font-size:10px;font-weight:500;color:var(--g4)}
.sb-toggle{position:absolute;top:20px;right:-12px;width:24px;height:24px;border-radius:50%;background:var(--sf);border:1px solid var(--g2);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:101;box-shadow:0 1px 4px rgba(0,0,0,.08);transition:all .15s;color:var(--g4);opacity:0}
.sidebar:hover .sb-toggle,.sb-toggle:focus{opacity:1}
.sb-toggle:hover{color:var(--ac);border-color:var(--ac);box-shadow:0 2px 8px rgba(96,77,255,.15)}
.sidebar nav{flex:1;display:flex;flex-direction:column;gap:2px;overflow-y:auto;overflow-x:hidden}
.sidebar nav button{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border:none;background:none;border-radius:10px;color:var(--g5);font-family:var(--sans);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;white-space:nowrap;overflow:hidden;position:relative}
.sidebar nav button:hover{background:var(--g1);color:var(--g6)}
.sidebar nav button.active{background:rgba(96,77,255,.08);color:var(--ac);font-weight:600}
.sidebar nav button.active::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:2px;background:var(--ac)}
.sidebar nav button .sb-icon{flex-shrink:0;width:20px;display:flex;align-items:center;justify-content:center}
.sidebar nav button .sb-badge{margin-left:auto;font-size:10px;font-weight:700;background:var(--red);color:#fff;padding:2px 7px;border-radius:10px;flex-shrink:0}
.sidebar.collapsed nav button{justify-content:center;padding:10px}
.sidebar.collapsed nav button span:not(.sb-icon):not(.sb-badge){display:none}
.sidebar.collapsed nav button .sb-badge{position:absolute;top:4px;right:4px;padding:1px 5px;font-size:8px}
.sidebar.collapsed nav button.active::before{left:2px}
.sidebar .sb-footer{margin-top:auto;padding-top:12px;border-top:1px solid var(--g1)}
.sidebar .sb-acct{display:flex;align-items:center;gap:10px;padding:10px 8px;white-space:nowrap;overflow:hidden}
.sidebar .sb-acct .sb-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--ac),#4A35E0);display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700;flex-shrink:0}
.sidebar .sb-acct .sb-acct-info{overflow:hidden}
.sidebar .sb-acct .sb-acct-name{font-size:12px;font-weight:600;color:var(--tx)}
.sidebar .sb-acct .sb-acct-email{font-size:10px;color:var(--g4)}
.sidebar .sb-footer button{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;border:none;background:none;border-radius:10px;color:var(--g4);font-family:var(--sans);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;white-space:nowrap;overflow:hidden}
.sidebar .sb-footer button:hover{background:var(--g1);color:var(--ac)}
.sidebar.collapsed .sb-footer button{justify-content:center}
.sidebar.collapsed .sb-footer button span:not(.sb-icon){display:none}
.sidebar.collapsed .sb-logo .sb-logo-text{display:none}
.sidebar.collapsed .sb-header{padding:0;justify-content:center}
.sidebar.collapsed .sb-acct .sb-acct-info{display:none}
.sidebar.collapsed .sb-acct{justify-content:center;padding:10px 0}

/* Sidebar tooltip */
.sidebar.collapsed nav button{position:relative}
.sidebar.collapsed nav button::after{content:attr(data-tip);position:absolute;left:calc(100% + 12px);top:50%;transform:translateY(-50%);background:var(--tx);color:#fff;font-size:11px;font-weight:500;padding:4px 10px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s;z-index:100}
.sidebar.collapsed nav button:hover::after{opacity:1}

/* Dark sidebar */
.dark .sidebar{box-shadow:1px 0 0 0 rgba(122,102,255,.08)}
.dark .sb-toggle{background:var(--sf);border-color:var(--g3)}
.dark .sidebar .sb-footer{border-top-color:var(--g2)}

/* Main content area */
.main{margin-left:var(--sb-w);flex:1;transition:margin-left .25s cubic-bezier(.4,0,.2,1);min-height:100vh}
.main.collapsed{margin-left:var(--sb-wc)}
.content{max-width:1200px;margin:0 auto;padding:24px 32px 80px}
.content-header{display:flex;align-items:center;justify-content:space-between;padding:12px 32px;border-bottom:1px solid var(--g1);background:var(--bg);position:sticky;top:0;z-index:40}
.dark .content-header{border-bottom-color:var(--g2)}

/* Page headers */
.pg-header{margin-bottom:24px;animation:fadeIn .3s ease}
.pg-header h1{font-family:var(--serif);font-size:28px;font-weight:400;margin-bottom:4px}
.pg-header p{font-size:13px;color:var(--g5)}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;font-family:var(--sans);font-size:13px;font-weight:600;border:none;cursor:pointer;transition:all .15s;white-space:nowrap}
.btn-p{background:var(--ac);color:#fff}.btn-p:hover{filter:brightness(1.1);transform:translateY(-1px)}
.btn-s{background:var(--g1);color:var(--tx)}.btn-s:hover{background:var(--g2)}
.btn-g{background:none;color:var(--g5);padding:9px 12px}.btn-g:hover{color:var(--tx);background:var(--g1)}
.btn-sm{padding:6px 12px;font-size:12px;border-radius:8px}
.btn-lg{padding:12px 24px;font-size:15px;border-radius:12px}
.btn-danger{background:rgba(255,71,87,.1);color:var(--red)}.btn-danger:hover{background:rgba(255,71,87,.2)}
.btn-success{background:rgba(29,185,84,.1);color:var(--green)}.btn-success:hover{background:rgba(29,185,84,.2)}
.dark .btn-s{background:var(--g2);color:var(--tx)}.dark .btn-s:hover{background:var(--g3)}
.dark .btn-g:hover{background:var(--g2)}

/* Chips */
.chip{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:40px;font-size:12px;font-weight:500;border:1px solid var(--g2);background:transparent;color:var(--g5);cursor:pointer;transition:all .15s}
.chip:hover{border-color:var(--g3);color:var(--tx)}
.chip.on{border-color:var(--ac);background:rgba(96,77,255,.06);color:var(--ac);font-weight:600}
.dark .chip{border-color:var(--g3)}.dark .chip.on{border-color:var(--ac);background:rgba(122,102,255,.12)}

/* List toolbar */
.list-toolbar{display:flex;align-items:center;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.list-search{display:flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--g2);border-radius:40px;background:var(--sf);max-width:280px;flex:1}
.list-search input{border:none;outline:none;background:transparent;font-family:var(--sans);font-size:13px;width:100%;color:var(--tx)}
.list-search input::placeholder{color:var(--g4)}
.dark .list-search{background:var(--sf);border-color:var(--g3)}
.dark .list-search input{color:var(--tx)}

/* Overlay */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(5px);z-index:200;display:flex;align-items:center;justify-content:center;animation:fadeIn .15s ease}
.dark .overlay>div{background:var(--sf);border-color:var(--g2)}

/* Mobile nav */
.mobile-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--sf);border-top:1px solid var(--g1);padding:6px 0;z-index:100;justify-content:space-around;align-items:center}
.mobile-nav button{display:flex;flex-direction:column;align-items:center;gap:2px;border:none;background:none;color:var(--g4);font-family:var(--sans);font-size:9px;font-weight:500;cursor:pointer;padding:6px 12px;border-radius:8px;transition:color .15s}
.mobile-nav button.active{color:var(--ac)}
.mobile-action-bar{display:none;position:sticky;top:0;left:0;right:0;background:var(--bg);padding:12px 16px;z-index:90;align-items:center;justify-content:space-between;border-bottom:1px solid var(--g1)}
.dark .mobile-nav{background:var(--sf);border-top-color:var(--g2)}
.dark .mobile-action-bar{background:var(--bg);border-bottom-color:var(--g2)}

/* Breadcrumb */
.breadcrumb-bar{display:flex;align-items:center;gap:6px;padding:12px 0;font-size:12px;margin-bottom:8px}
.breadcrumb-bar .bc-link{color:var(--g4);cursor:pointer;transition:color .15s;border:none;background:none;font-family:var(--sans);font-size:12px;font-weight:500}
.breadcrumb-bar .bc-link:hover{color:var(--ac)}
.breadcrumb-bar .bc-sep{color:var(--g3);font-size:10px}
.breadcrumb-bar .bc-current{color:var(--tx);font-weight:600}
.dark .breadcrumb-bar .bc-link{color:var(--g5)}
.dark .breadcrumb-bar .bc-link:hover{color:var(--tx)}

/* Form fields */
.field{margin-bottom:14px}
.field label{display:block;font-size:12px;font-weight:600;margin-bottom:5px;color:var(--g6)}
.field input,.field textarea,.field select{width:100%;padding:11px 14px;border:1px solid var(--g2);border-radius:10px;font-family:var(--sans);font-size:13px;background:var(--g1);outline:none;transition:all .2s;color:var(--tx)}
.field input:focus,.field textarea:focus,.field select:focus{border-color:var(--ac);background:#fff;box-shadow:0 0 0 3px rgba(96,77,255,.08)}
.field input::placeholder,.field textarea::placeholder{color:var(--g4)}
.field textarea{min-height:80px;resize:vertical}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.field-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.dark .field input,.dark .field textarea,.dark .field select{background:var(--g1);border-color:var(--g3);color:var(--tx)}
.dark .field input:focus,.dark .field textarea:focus,.dark .field select:focus{background:var(--sf);border-color:var(--ac)}

/* === STORE SPECIFIC CSS === */

/* Program cards */
.prog-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;animation:fadeIn .3s ease}
.prog-card{background:var(--sf);border-radius:20px;overflow:hidden;transition:all .25s cubic-bezier(.4,0,.2,1);cursor:pointer;position:relative;box-shadow:0 2px 12px rgba(96,77,255,.06)}
.prog-card:nth-child(1){animation-delay:.05s}.prog-card:nth-child(2){animation-delay:.1s}.prog-card:nth-child(3){animation-delay:.15s}.prog-card:nth-child(4){animation-delay:.2s}
.prog-card:active{transform:scale(.98)!important}
.prog-card::before{content:"";position:absolute;left:0;top:20px;bottom:20px;width:3px;border-radius:0 3px 3px 0;z-index:1}
.prog-card.intensive::before{background:linear-gradient(180deg,var(--ac),rgba(96,77,255,.2))}
.prog-card.workshop::before{background:linear-gradient(180deg,var(--amber),rgba(245,166,35,.2))}
.prog-card.masterclass::before{background:linear-gradient(180deg,var(--green),rgba(29,185,84,.2))}
.prog-card .prog-banner{width:100%;height:140px;display:flex;align-items:center;justify-content:center;font-size:40px;position:relative}
.prog-card .prog-banner.intensive{background:linear-gradient(135deg,rgba(96,77,255,.15),rgba(96,77,255,.05))}
.prog-card .prog-banner.workshop{background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(245,166,35,.05))}
.prog-card .prog-banner.masterclass{background:linear-gradient(135deg,rgba(29,185,84,.15),rgba(29,185,84,.05))}
.prog-card .prog-body{padding:20px 24px 24px}
.prog-card:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(96,77,255,.12)}
.prog-card .prog-type{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:3px 8px;border-radius:40px;display:inline-flex;align-items:center;gap:3px}
.prog-card .prog-type.intensive{background:rgba(96,77,255,.1);color:var(--ac)}
.prog-card .prog-type.workshop{background:rgba(245,166,35,.1);color:var(--amber)}
.prog-card .prog-type.masterclass{background:rgba(29,185,84,.1);color:var(--green)}
.prog-card .prog-status{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:3px 8px;border-radius:40px;margin-left:6px}
.prog-card .prog-status.published{background:#E6FFF0;color:var(--green)}
.prog-card .prog-status.draft{background:var(--g1);color:var(--g4)}
.prog-card .prog-status.closed{background:#FFF0F0;color:var(--red)}
.prog-card .prog-title{font-size:18px;font-weight:600;margin:10px 0 4px}
.prog-card .prog-location{font-size:13px;color:var(--g4);margin-bottom:12px;display:flex;align-items:center;gap:4px}
.prog-card .prog-meta{display:flex;gap:20px}
.prog-card .prog-meta-i .mv{font-family:var(--mono);font-size:18px;font-weight:700;color:var(--ac)}
.prog-card .prog-meta-i .ml{font-size:9px;color:var(--g4);text-transform:uppercase;letter-spacing:.05em}
.prog-card .prog-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:12px}
.prog-card .prog-tag{font-size:10px;padding:2px 8px;border-radius:20px;background:var(--g1);color:var(--g5)}
.prog-card .prog-price{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);color:#fff;font-family:var(--mono);font-size:14px;font-weight:700;padding:6px 12px;border-radius:10px}
.prog-card .prog-deadline{position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,.5);color:var(--g3);font-size:10px;padding:3px 8px;border-radius:6px}

/* Dark mode program cards */
.dark .prog-card{background:var(--sf);border-color:var(--g2)}
.dark .prog-card .prog-status.published{background:rgba(46,204,113,.12)!important;color:var(--green)!important}
.dark .prog-card .prog-status.draft{background:rgba(255,255,255,.06)!important;color:var(--g5)!important}
.dark .prog-card .prog-status.closed{background:rgba(255,107,122,.12)!important;color:var(--red)!important}
.dark .prog-card .prog-tag{background:var(--g2);color:var(--g5)}

/* Applicant cards */
.app-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;animation:fadeIn .3s ease}
.app-card{border-radius:14px;overflow:hidden;cursor:pointer;position:relative;aspect-ratio:3/4;background:var(--g1);transition:all .2s;border:1px solid transparent}
.app-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.12);border-color:var(--ac)}
.app-card .app-img{width:100%;height:100%;object-fit:cover;filter:grayscale(20%)}
.app-card .app-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700;color:var(--g3);background:linear-gradient(135deg,var(--g1),var(--g2))}
.app-card .app-overlay{position:absolute;bottom:0;left:0;right:0;padding:12px;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff}
.app-card .app-name{font-size:13px;font-weight:600;margin-bottom:2px}
.app-card .app-loc{font-size:10px;opacity:.7}
.app-card .app-badge{position:absolute;top:8px;right:8px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:3px 8px;border-radius:20px}
.app-badge.submitted{background:rgba(96,77,255,.9);color:#fff}
.app-badge.under_review{background:rgba(245,166,35,.9);color:#fff}
.app-badge.accepted{background:rgba(29,185,84,.9);color:#fff}
.app-badge.scholarship{background:rgba(255,215,0,.9);color:#000}
.app-badge.waitlisted{background:rgba(26,86,219,.9);color:#fff}
.app-badge.rejected{background:rgba(255,71,87,.9);color:#fff}
.app-card .app-num{position:absolute;top:8px;left:8px;width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,.5);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
.dark .app-card{background:var(--g2);border-color:var(--g2)}

/* Applicant detail panel */
.app-detail{max-width:860px;width:95vw;max-height:90vh;overflow-y:auto;background:var(--sf);border-radius:24px;padding:0;animation:scaleIn .2s ease}
.app-detail-header{padding:28px 32px 20px;border-bottom:1px solid var(--g1);display:flex;gap:20px;align-items:flex-start}
.app-detail-avatar{width:80px;height:80px;border-radius:16px;background:linear-gradient(135deg,var(--g1),var(--g2));display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:var(--g4);flex-shrink:0;overflow:hidden}
.app-detail-avatar img{width:100%;height:100%;object-fit:cover}
.app-detail-info h2{font-family:var(--serif);font-size:24px;font-weight:400;margin-bottom:4px}
.app-detail-info .app-detail-meta{font-size:13px;color:var(--g5);display:flex;flex-wrap:wrap;gap:12px}
.app-detail-body{padding:24px 32px 32px}
.app-detail-section{margin-bottom:24px}
.app-detail-section h3{font-size:14px;font-weight:600;margin-bottom:10px;color:var(--tx);display:flex;align-items:center;gap:6px}
.app-detail-section p{font-size:13px;line-height:1.7;color:var(--g5)}
.app-detail-actions{display:flex;gap:8px;padding:20px 32px;border-top:1px solid var(--g1);background:var(--g1);border-radius:0 0 24px 24px}
.dark .app-detail{background:var(--sf)}
.dark .app-detail-header{border-bottom-color:var(--g2)}
.dark .app-detail-actions{background:var(--g1);border-top-color:var(--g2)}

/* Stats cards */
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:24px}
.stat-card{background:var(--sf);border-radius:16px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.stat-card .stat-label{font-size:11px;color:var(--g4);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.stat-card .stat-value{font-family:var(--mono);font-size:28px;font-weight:700;color:var(--tx)}
.stat-card .stat-sub{font-size:11px;color:var(--g5);margin-top:4px}
.dark .stat-card{box-shadow:0 1px 3px rgba(0,0,0,.2)}

/* Dashboard styles */
.dash-grid{display:grid;grid-template-columns:1fr 380px;gap:20px}
.dash-banner{background:linear-gradient(135deg,#f0edff 0%,#e8e4ff 25%,#ddd6ff 50%,#f0edff 75%,#e8e4ff 100%);background-size:200% 200%;animation:bannerShift 8s ease infinite;border-radius:24px;padding:36px;margin-bottom:24px;position:relative;overflow:hidden}
.dash-banner-text{position:relative;z-index:1}
.dash-banner-text div:first-child{font-size:13px;color:var(--g5);margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.dash-banner-text h2{font-family:var(--serif);font-size:28px;font-weight:400;margin-bottom:8px}
.dash-banner-text p{font-size:13px;color:var(--g5);max-width:400px;line-height:1.6}
.dash-section{background:var(--sf);border-radius:20px;padding:24px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.dash-section h3{font-size:15px;font-weight:600;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.dash-section h3 .ds-count{font-size:11px;color:var(--g4);font-weight:500}
.dark .dash-section{background:var(--sf);border-color:var(--g2)}
.dark .dash-banner{background:linear-gradient(135deg,#1a1040 0%,#2d1b69 25%,#4a2a8a 50%,#604DFF 75%,#2d1b69 100%);background-size:200% 200%;animation:bannerShift 8s ease infinite;border:1px solid var(--g2)}

/* Revenue chart */
.rev-bars{display:flex;align-items:flex-end;gap:6px;height:120px;padding:8px 0}
.rev-bar{flex:1;border-radius:6px 6px 0 0;background:linear-gradient(180deg,var(--ac),rgba(96,77,255,.4));min-width:16px;transition:all .3s;position:relative;cursor:pointer}
.rev-bar:hover{filter:brightness(1.2)}
.rev-bar .rev-tip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:var(--tx);color:#fff;font-size:10px;padding:3px 8px;border-radius:4px;white-space:nowrap;opacity:0;transition:opacity .15s;pointer-events:none;margin-bottom:4px}
.rev-bar:hover .rev-tip{opacity:1}
.rev-labels{display:flex;gap:6px;margin-top:4px}
.rev-labels span{flex:1;text-align:center;font-size:9px;color:var(--g4)}

/* Activity feed */
.activity-item{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--g1);align-items:flex-start}
.activity-item:last-child{border-bottom:none}
.activity-icon{width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-size:14px}
.activity-icon.application{background:rgba(96,77,255,.12);color:var(--ac)}
.activity-icon.payment{background:rgba(29,185,84,.12);color:var(--green)}
.activity-icon.ticket{background:rgba(245,166,35,.12);color:var(--amber)}
.activity-icon.confirmation{background:rgba(26,86,219,.12);color:#1A56DB}
.activity-icon.publish{background:rgba(96,77,255,.12);color:var(--ac)}
.activity-icon.scholarship{background:rgba(255,215,0,.15);color:#B8860B}
.activity-icon.refund{background:rgba(255,71,87,.12);color:var(--red)}
.activity-text{font-size:13px;color:var(--tx);line-height:1.4}
.activity-time{font-size:11px;color:var(--g4);margin-top:2px}
.dark .activity-item{border-bottom-color:var(--g2)}

/* Financial dashboard */
.fin-overview{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
.fin-card{background:var(--sf);border-radius:16px;padding:20px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.fin-card .fin-amount{font-family:var(--mono);font-size:32px;font-weight:700}
.fin-card .fin-label{font-size:11px;color:var(--g4);text-transform:uppercase;letter-spacing:.05em;margin-top:4px}
.fin-card.collected .fin-amount{color:var(--green)}
.fin-card.pending .fin-amount{color:var(--amber)}
.fin-card.overdue .fin-amount{color:var(--red)}
.dark .fin-card{box-shadow:0 1px 3px rgba(0,0,0,.2)}

/* Payment table */
.pay-table{width:100%;border-collapse:collapse;font-size:13px}
.pay-table th{text-align:left;padding:10px 12px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--g4);border-bottom:2px solid var(--g2);font-weight:600}
.pay-table td{padding:10px 12px;border-bottom:1px solid var(--g1)}
.pay-table tr:hover{background:var(--g1)}
.pay-status{font-size:10px;font-weight:700;text-transform:uppercase;padding:3px 8px;border-radius:20px}
.pay-status.succeeded{background:rgba(29,185,84,.1);color:var(--green)}
.pay-status.pending{background:rgba(245,166,35,.1);color:var(--amber)}
.pay-status.failed{background:rgba(255,71,87,.1);color:var(--red)}
.pay-status.refunded{background:rgba(96,77,255,.1);color:var(--ac)}
.dark .pay-table th{border-bottom-color:var(--g3)}
.dark .pay-table td{border-bottom-color:var(--g2)}
.dark .pay-table tr:hover{background:var(--g1)}

/* Installment timeline */
.inst-timeline{display:flex;gap:0;margin:16px 0}
.inst-step{flex:1;text-align:center;position:relative;padding-top:24px}
.inst-step::before{content:"";position:absolute;top:8px;left:0;right:0;height:2px;background:var(--g2)}
.inst-step:first-child::before{left:50%}
.inst-step:last-child::before{right:50%}
.inst-step .inst-dot{width:16px;height:16px;border-radius:50%;position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:1}
.inst-step .inst-dot.paid{background:var(--green)}
.inst-step .inst-dot.pending{background:var(--amber)}
.inst-step .inst-dot.upcoming{background:var(--g3)}
.inst-step .inst-amount{font-family:var(--mono);font-size:14px;font-weight:700;margin-bottom:2px}
.inst-step .inst-label{font-size:10px;color:var(--g4)}

/* Participant roster */
.roster-table{width:100%;border-collapse:collapse;font-size:13px}
.roster-table th{text-align:left;padding:10px 12px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--g4);border-bottom:2px solid var(--g2);font-weight:600}
.roster-table td{padding:10px 12px;border-bottom:1px solid var(--g1);vertical-align:middle}
.roster-table tr:hover{background:var(--g1)}
.roster-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--ac),#4A35E0);display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700}
.roster-name{display:flex;align-items:center;gap:10px}
.dark .roster-table th{border-bottom-color:var(--g3)}
.dark .roster-table td{border-bottom-color:var(--g2)}

/* Checkout / Ticket purchase */
.checkout-page{max-width:560px;margin:0 auto;padding:40px 20px}
.checkout-card{background:var(--sf);border-radius:24px;padding:32px;box-shadow:0 4px 20px rgba(0,0,0,.08)}
.checkout-summary{padding:20px;background:var(--g1);border-radius:16px;margin-bottom:24px}
.checkout-summary h3{font-size:15px;font-weight:600;margin-bottom:12px}
.checkout-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:13px}
.checkout-row.total{border-top:2px solid var(--g2);margin-top:8px;padding-top:12px;font-weight:700;font-size:15px}
.checkout-row .cr-label{color:var(--g5)}
.checkout-row .cr-value{font-family:var(--mono);font-weight:600}
.stripe-stub{border:2px dashed var(--g2);border-radius:16px;padding:24px;text-align:center;margin:20px 0}
.stripe-stub .ss-title{font-size:13px;font-weight:600;margin-bottom:8px;display:flex;align-items:center;justify-content:center;gap:6px}
.stripe-field{background:var(--g1);border:1px solid var(--g2);border-radius:10px;padding:12px 14px;margin-bottom:10px;font-size:13px;color:var(--g4);text-align:left}
.dark .checkout-card{background:var(--sf)}
.dark .checkout-summary{background:var(--g1)}
.dark .stripe-stub{border-color:var(--g3)}
.dark .stripe-field{background:var(--g2);border-color:var(--g3);color:var(--g5)}

/* Communication */
.compose-form{background:var(--sf);border-radius:20px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.msg-log{margin-top:16px}
.msg-log-item{background:var(--sf);border-radius:16px;padding:16px 20px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.04)}
.msg-log-item .msg-log-subject{font-size:14px;font-weight:600;margin-bottom:4px}
.msg-log-item .msg-log-meta{font-size:11px;color:var(--g4);display:flex;gap:12px}
.dark .compose-form{background:var(--sf)}
.dark .msg-log-item{background:var(--sf)}

/* Communication templates */
.tpl-layout{display:grid;grid-template-columns:280px 1fr;gap:16px;min-height:500px}
.tpl-list{background:var(--sf);border:1px solid var(--g2);border-radius:16px;display:flex;flex-direction:column;overflow:hidden}
.tpl-list-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--g1);font-size:14px;font-weight:600}
.tpl-group{padding:8px}
.tpl-group-title{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--g4);padding:8px 12px 4px}
.tpl-item{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;cursor:pointer;transition:all .12s;font-size:13px;color:var(--g5)}
.tpl-item:hover{background:var(--g1);color:var(--tx)}
.tpl-item.active{background:rgba(96,77,255,.06);color:var(--ac);font-weight:600}
.tpl-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.tpl-dot.confirmation{background:var(--green)}
.tpl-dot.reminder{background:var(--amber)}
.tpl-dot.update{background:var(--ac)}
.tpl-dot.waitlist{background:var(--amber)}
.tpl-dot.rejection{background:var(--red)}
.tpl-editor{background:var(--sf);border:1px solid var(--g2);border-radius:16px;display:flex;flex-direction:column;overflow:hidden}
.tpl-editor-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--g1)}
.tpl-editor-header h3{font-size:16px;font-weight:600}
.tpl-editor-body{padding:20px;display:flex;flex-direction:column;gap:12px;flex:1}
.tpl-editor-body textarea{border:1px solid var(--g2);border-radius:12px;padding:14px;font-family:var(--sans);font-size:13px;min-height:200px;resize:vertical;background:var(--bg);color:var(--tx);outline:none;transition:border .2s;flex:1;line-height:1.7}
.tpl-editor-body textarea:focus{border-color:var(--ac);background:var(--sf)}
.tpl-vars{display:flex;flex-wrap:wrap;gap:4px}
.tpl-var{padding:4px 10px;border-radius:40px;background:rgba(96,77,255,.08);color:var(--ac);font-family:var(--mono);font-size:11px;cursor:pointer;border:none;transition:all .15s}
.tpl-var:hover{background:rgba(96,77,255,.15)}
.dark .tpl-list{border-color:var(--g2);background:var(--sf)}
.dark .tpl-editor{border-color:var(--g2);background:var(--sf)}
.dark .tpl-editor-body textarea{background:var(--bg);border-color:var(--g3)}

/* Cancellation modal */
.cancel-modal{max-width:480px;width:95vw;background:var(--sf);border-radius:24px;padding:32px;animation:scaleIn .2s ease}
.cancel-breakdown{background:var(--g1);border-radius:12px;padding:16px;margin:16px 0}
.cancel-breakdown .cb-row{display:flex;justify-content:space-between;padding:4px 0;font-size:13px}
.cancel-breakdown .cb-row.refund{font-weight:700;color:var(--green);border-top:1px solid var(--g2);margin-top:8px;padding-top:8px}
.dark .cancel-modal{background:var(--sf)}
.dark .cancel-breakdown{background:var(--g1)}

/* Program detail overview */
.prog-overview-banner{border-radius:20px;padding:40px;position:relative;overflow:hidden;margin-bottom:24px;min-height:200px;display:flex;flex-direction:column;justify-content:flex-end}
.prog-overview-banner.intensive{background:linear-gradient(135deg,rgba(96,77,255,.2),rgba(96,77,255,.05))}
.prog-overview-banner.workshop{background:linear-gradient(135deg,rgba(245,166,35,.2),rgba(245,166,35,.05))}
.prog-overview-banner.masterclass{background:linear-gradient(135deg,rgba(29,185,84,.2),rgba(29,185,84,.05))}
.prog-overview-banner h2{font-family:var(--serif);font-size:28px;font-weight:400;margin-bottom:6px}
.prog-overview-banner .pob-meta{font-size:13px;color:var(--g5);display:flex;flex-wrap:wrap;gap:16px}
.prog-overview-banner .pob-price{position:absolute;top:20px;right:20px;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);color:#fff;font-family:var(--mono);font-size:18px;font-weight:700;padding:8px 16px;border-radius:12px}

/* Settings sections */
.settings-section{background:var(--sf);border:1px solid var(--g2);border-radius:16px;padding:24px;margin-bottom:16px}
.settings-section h3{font-size:15px;font-weight:600;margin-bottom:4px}
.settings-section .ss-sub{font-size:12px;color:var(--g4);margin-bottom:16px}
.settings-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--g1)}
.settings-row:last-child{border-bottom:none}
.sr-label{font-size:13px;font-weight:500}
.sr-sub{font-size:11px;color:var(--g4);margin-top:1px}
.toggle-sw{width:40px;height:22px;border-radius:11px;background:var(--g3);cursor:pointer;position:relative;border:none;transition:background .2s;flex-shrink:0}
.toggle-sw.on{background:linear-gradient(135deg,#7A66FF,#4A35E0)}
.toggle-sw::after{content:'';position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s}
.toggle-sw.on::after{transform:translateX(18px)}
.dark .settings-section{border-color:var(--g2);background:var(--sf)}
.dark .settings-row{border-bottom-color:var(--g2)}

/* Program schedule */
.schedule-list{display:flex;flex-direction:column;gap:8px}
.schedule-item{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--g1);border-radius:12px}
.schedule-date{font-family:var(--mono);font-size:13px;font-weight:600;min-width:100px}
.schedule-info{flex:1;font-size:13px;color:var(--g5)}
.dark .schedule-item{background:var(--g1)}

/* Share modal */
.share-modal{max-width:520px;width:95vw;background:var(--sf);border-radius:24px;padding:32px;animation:scaleIn .2s ease}
.share-link-box{display:flex;gap:8px;margin:12px 0}
.share-link-box input{flex:1;padding:10px 14px;border:1px solid var(--g2);border-radius:10px;font-family:var(--mono);font-size:12px;background:var(--g1);color:var(--tx)}
.dark .share-modal{background:var(--sf)}
.dark .share-link-box input{background:var(--g1);border-color:var(--g3);color:var(--tx)}

/* Toolbar */
.cand-toolbar{position:sticky;top:49px;z-index:35;background:var(--bg);display:flex;align-items:center;gap:8px;padding:16px 0 12px;flex-wrap:wrap;margin-bottom:16px}
.cand-toolbar.stuck{box-shadow:0 4px 20px rgba(0,0,0,.08)}
.cand-search{display:flex;align-items:center;gap:8px;padding:6px 12px;border:1px solid var(--g2);border-radius:40px;background:var(--sf);flex:1;max-width:260px}
.cand-search input{border:none;outline:none;background:transparent;font-family:var(--sans);font-size:12px;width:100%;color:var(--tx)}
.cand-search input::placeholder{color:var(--g4)}
.dark .cand-toolbar{background:var(--sf);border:1px solid var(--g2)}
.dark .cand-search{background:var(--sf);border-color:var(--g3)}
.dark .cand-search input{color:var(--tx)}

/* Public program view */
.public-program{max-width:720px;margin:0 auto;padding:40px 20px}
.public-banner{border-radius:20px;overflow:hidden;margin-bottom:24px;min-height:240px;display:flex;flex-direction:column;justify-content:flex-end;padding:32px;position:relative}
.public-banner.intensive{background:linear-gradient(135deg,#604DFF,#3a2db8)}
.public-banner.workshop{background:linear-gradient(135deg,#F5A623,#d48b0f)}
.public-banner.masterclass{background:linear-gradient(135deg,#1DB954,#168f3f)}
.public-banner h1{font-family:var(--serif);font-size:32px;font-weight:400;color:#fff;margin-bottom:6px}
.public-banner .pub-org{font-size:14px;color:rgba(255,255,255,.7)}
.public-details{background:var(--sf);border-radius:20px;padding:28px;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
.public-details h3{font-size:15px;font-weight:600;margin-bottom:12px}
.public-details p{font-size:14px;color:var(--g5);line-height:1.7}
.pub-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0}
.pub-info-item{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--g5)}
.pub-info-item strong{color:var(--tx);font-weight:600}

/* Application form */
.apply-form{background:var(--sf);border-radius:20px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,.06)}
.apply-form h3{font-size:15px;font-weight:600;margin-bottom:16px}

/* Confirmation page */
.confirm-page{max-width:560px;margin:0 auto;padding:40px 20px;text-align:center}
.confirm-icon{width:64px;height:64px;border-radius:50%;background:rgba(29,185,84,.1);color:var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:32px}
.confirm-page h2{font-family:var(--serif);font-size:24px;font-weight:400;margin-bottom:8px}
.confirm-page .confirm-sub{font-size:14px;color:var(--g5);margin-bottom:24px}

/* Toggle switch */
.toggle{width:40px;height:22px;border-radius:11px;background:var(--g3);position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.toggle.on{background:var(--ac)}
.toggle::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s}
.toggle.on::after{transform:translateX(18px)}
.dark .toggle::after{background:var(--sf)}

/* New program modal */
.new-prog-modal{max-width:640px;width:95vw;max-height:90vh;overflow-y:auto;background:var(--sf);border-radius:24px;padding:36px;animation:scaleIn .2s ease}
.new-prog-modal h2{font-family:var(--serif);font-size:24px;font-weight:400;margin-bottom:6px}
.new-prog-modal .npm-sub{font-size:13px;color:var(--g5);margin-bottom:24px}
.model-select{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px}
.model-option{border:2px solid var(--g2);border-radius:16px;padding:20px;cursor:pointer;transition:all .15s;text-align:center}
.model-option:hover{border-color:var(--ac);background:rgba(96,77,255,.03)}
.model-option.selected{border-color:var(--ac);background:rgba(96,77,255,.06)}
.model-option .mo-icon{font-size:28px;margin-bottom:8px}
.model-option .mo-title{font-size:14px;font-weight:600;margin-bottom:4px}
.model-option .mo-desc{font-size:11px;color:var(--g5)}
.dark .model-option{border-color:var(--g3)}
.dark .model-option:hover,.dark .model-option.selected{border-color:var(--ac);background:rgba(122,102,255,.08)}

/* Confirm dialog */
.confirm-dialog{max-width:400px;width:90vw;background:var(--sf);border-radius:24px;padding:32px;text-align:center;animation:scaleIn .2s ease}
.confirm-dialog h3{font-size:18px;font-weight:600;margin-bottom:8px}
.confirm-dialog p{font-size:13px;color:var(--g5);margin-bottom:20px;line-height:1.5}

/* Toast */
.toast{position:fixed;bottom:24px;right:24px;background:var(--tx);color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:500;z-index:300;animation:slideUp .3s ease;box-shadow:0 4px 16px rgba(0,0,0,.2)}

/* Empty state */
.empty-state{text-align:center;padding:60px 20px;color:var(--g4)}
.empty-state .es-icon{font-size:48px;margin-bottom:12px;opacity:.5}
.empty-state p{font-size:14px;margin-top:8px;max-width:320px;margin-left:auto;margin-right:auto;line-height:1.5}

/* Participant cards */
.part-card{background:var(--sf);border-radius:16px;margin-bottom:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:all .2s}
.part-card:hover{box-shadow:0 2px 8px rgba(0,0,0,.08)}
.part-row{display:grid;grid-template-columns:1fr 100px 100px 140px 100px 180px;align-items:center;gap:8px;padding:14px 20px;cursor:pointer;transition:background .15s}
.part-row:hover{background:var(--g1)}
.part-row .part-info{display:flex;align-items:center;gap:12px}
.part-row .part-meta{display:flex;gap:8px;align-items:center}
.part-expanded{padding:0 20px 20px;border-top:1px solid var(--g1);animation:slideUp .2s ease}
.part-expanded .pe-section{margin-top:16px}
.part-expanded .pe-section h4{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--g4);margin-bottom:10px}
.part-expanded .pe-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.part-expanded .pe-item{font-size:13px;color:var(--g5)}
.part-expanded .pe-item strong{display:block;color:var(--tx);font-size:12px;font-weight:600;margin-bottom:2px}
.dark .part-card{background:var(--sf);box-shadow:0 1px 3px rgba(0,0,0,.2)}
.dark .part-row:hover{background:var(--g1)}
.dark .part-expanded{border-top-color:var(--g2)}

/* Responsive */
@media(max-width:960px){.dash-grid{grid-template-columns:1fr}.fin-overview{grid-template-columns:1fr 1fr}}
@media(max-width:768px){
.sidebar{display:none}
.main{margin-left:0!important}
.content{padding:20px 16px}
.content-header{padding:8px 16px}
.mobile-nav{display:flex!important}
.mobile-action-bar{display:flex!important}
.pg-header h1{font-size:24px}
.overlay>div{width:100%!important;max-width:100%!important;border-radius:20px 20px 0 0!important;max-height:85vh!important;position:fixed;bottom:0}
.stat-grid{grid-template-columns:1fr 1fr}
.prog-list{grid-template-columns:1fr}
.app-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.fin-overview{grid-template-columns:1fr}
.pub-info-grid{grid-template-columns:1fr}
.field-row,.field-row-3{grid-template-columns:1fr}
.cvs-tpl-grid{grid-template-columns:repeat(2,1fr)}
.cvs-editor{flex-direction:column;height:auto}
.cvs-editor-panel{width:100%;border-right:none;border-bottom:1px solid var(--g2);max-height:300px}
}

/* ============================================================ */
/* CANVAS BUILDER UI                                             */
/* ============================================================ */
.cvs-stepper{display:flex;align-items:center;gap:0;margin-bottom:28px}
.cvs-step{display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 0;user-select:none}
.cvs-step-num{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;border:2px solid var(--g3);color:var(--g4);transition:all .2s;flex-shrink:0}
.cvs-step.active .cvs-step-num{border-color:var(--ac);background:var(--ac);color:#fff}
.cvs-step.done .cvs-step-num{border-color:var(--ac);background:rgba(96,77,255,.1);color:var(--ac)}
.cvs-step-label{font-size:12px;font-weight:500;color:var(--g4);white-space:nowrap}
.cvs-step.active .cvs-step-label{color:var(--ac);font-weight:600}
.cvs-step.done .cvs-step-label{color:var(--ac)}
.cvs-step-line{flex:1;height:2px;background:var(--g2);margin:0 12px;min-width:16px}
.cvs-step-line.done{background:var(--ac)}

/* Template Picker */
.cvs-tpl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.cvs-tpl-card{border-radius:16px;overflow:hidden;border:2px solid var(--g2);cursor:pointer;transition:all .25s;position:relative}
.cvs-tpl-card:hover{border-color:var(--g3);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.08)}
.cvs-tpl-card.selected{border-color:var(--ac);box-shadow:0 0 0 3px rgba(96,77,255,.15)}
.cvs-tpl-thumb{height:160px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.cvs-tpl-info{padding:16px;background:var(--sf)}
.cvs-tpl-name{font-size:15px;font-weight:600;margin-bottom:2px}
.cvs-tpl-sub{font-size:11px;color:var(--ac);font-family:var(--mono);letter-spacing:.5px;margin-bottom:4px}
.cvs-tpl-desc{font-size:12px;color:var(--g4);line-height:1.5}
.cvs-tpl-badge{position:absolute;top:12px;right:12px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;backdrop-filter:blur(8px)}
.cvs-tpl-badge.free{background:rgba(29,185,84,.2);color:#1DB954}
.cvs-tpl-badge.premium{background:rgba(245,166,35,.2);color:#F5A623}
.cvs-tpl-check{position:absolute;top:12px;left:12px;width:24px;height:24px;border-radius:50%;background:var(--ac);color:#fff;display:flex;align-items:center;justify-content:center;animation:scaleIn .2s ease}

/* Section Editor */
.cvs-editor{display:flex;gap:0;border:1px solid var(--g2);border-radius:16px;overflow:hidden;height:620px;background:var(--sf)}
.cvs-editor-panel{width:300px;border-right:1px solid var(--g2);overflow-y:auto;padding:20px;flex-shrink:0}
.cvs-editor-panel h4{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--g4);margin-bottom:12px;font-weight:600}
.cvs-editor-preview{flex:1;overflow:hidden;background:var(--g1);position:relative}
.cvs-editor-preview-scroll{overflow-y:auto;height:100%}
.cvs-section-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;margin-bottom:4px;cursor:grab;transition:all .15s;border:1px solid transparent}
.cvs-section-row:hover{background:var(--g1);border-color:var(--g2)}
.cvs-section-row.dragging{opacity:.4;background:rgba(96,77,255,.06);border-color:var(--ac)}
.cvs-section-row.drag-over{border-color:var(--ac);background:rgba(96,77,255,.04)}
.cvs-grip{color:var(--g3);display:flex;flex-direction:column;gap:2px;flex-shrink:0;cursor:grab}
.cvs-grip span{display:block;width:12px;height:2px;background:currentColor;border-radius:1px}
.cvs-section-icon{color:var(--g4);flex-shrink:0}
.cvs-section-label{flex:1;font-size:13px;font-weight:500}
.cvs-section-label.disabled{color:var(--g4);text-decoration:line-through;opacity:.6}

/* Brand Settings */
.cvs-color-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
.cvs-color-swatch{width:38px;height:38px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:all .15s;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cvs-color-swatch:hover{transform:scale(1.1)}
.cvs-color-swatch.selected{border-color:var(--tx);box-shadow:0 0 0 2px var(--sf),0 0 0 4px var(--tx)}
.cvs-font-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.cvs-font-card{padding:20px;border:2px solid var(--g2);border-radius:14px;cursor:pointer;transition:all .2s;text-align:center}
.cvs-font-card:hover{border-color:var(--g3)}
.cvs-font-card.selected{border-color:var(--ac);background:rgba(96,77,255,.04)}
.cvs-font-sample{font-size:22px;margin-bottom:8px;font-weight:400}
.cvs-font-label{font-size:11px;color:var(--g4);font-family:var(--mono)}
.cvs-upload-zone{border:2px dashed var(--g2);border-radius:14px;padding:32px;text-align:center;cursor:pointer;transition:all .2s;background:var(--g1)}
.cvs-upload-zone:hover{border-color:var(--ac);background:rgba(96,77,255,.03)}

/* Preview Device Frame */
.cvs-device-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.cvs-device-toggle{display:flex;gap:4px;background:var(--g1);border-radius:10px;padding:3px}
.cvs-device-btn{padding:6px 16px;border-radius:8px;border:none;background:transparent;font-size:12px;font-weight:500;cursor:pointer;color:var(--g5);transition:all .15s;font-family:var(--sans)}
.cvs-device-btn.active{background:var(--sf);color:var(--ac);font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.cvs-device-frame{margin:0 auto;border:1px solid var(--g2);border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,.06);transition:width .3s ease;background:#fff}
.cvs-device-frame.desktop{width:100%}
.cvs-device-frame.tablet{width:768px;max-width:100%}
.cvs-device-frame.mobile{width:375px;max-width:100%}
.cvs-device-inner{height:600px;overflow-y:auto}

/* Canvas Template Common Styles */
.cvs-tpl-play{width:64px;height:64px;border-radius:50%;border:2px solid rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px);background:rgba(255,255,255,.08);transition:all .2s}
.cvs-tpl-play:hover{transform:scale(1.08);background:rgba(255,255,255,.15)}
.cvs-tpl-tag{display:inline-flex;padding:4px 12px;border-radius:50px;font-size:10px;letter-spacing:2px;font-family:monospace}
.cvs-tpl-verified{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:50px;font-size:10px;letter-spacing:1.5px;font-family:monospace;font-weight:600}

/* Dark mode canvas overrides */
.dark .cvs-editor{border-color:var(--g2)}
.dark .cvs-editor-panel{border-right-color:var(--g2)}
.dark .cvs-tpl-card{border-color:var(--g3)}
.dark .cvs-tpl-card.selected{border-color:var(--ac)}
.dark .cvs-tpl-info{background:var(--sf)}
.dark .cvs-device-frame{border-color:var(--g3);background:var(--sf)}
.dark .cvs-font-card{border-color:var(--g3)}
.dark .cvs-upload-zone{border-color:var(--g3);background:rgba(255,255,255,.02)}

/* Canvas Mode Selector */
.cvs-mode-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
.cvs-mode-card{padding:32px 24px;border:2px solid var(--g2);border-radius:20px;cursor:pointer;transition:all .25s;text-align:center;position:relative}
.cvs-mode-card:hover{border-color:var(--g3);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}
.cvs-mode-card.active{border-color:var(--ac);background:rgba(96,77,255,.04)}
.cvs-mode-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.cvs-mode-title{font-size:16px;font-weight:600;margin-bottom:4px}
.cvs-mode-desc{font-size:12px;color:var(--g4);line-height:1.5}

/* Canvas Customize Sub-tabs */
.cvs-sub-tabs{display:flex;gap:2px;background:var(--g1);border-radius:10px;padding:3px;margin-bottom:16px}
.cvs-sub-tab{flex:1;padding:6px 12px;border-radius:8px;border:none;background:transparent;font-size:11px;font-weight:500;cursor:pointer;color:var(--g5);transition:all .15s;font-family:var(--sans);text-align:center}
.cvs-sub-tab.active{background:var(--sf);color:var(--ac);font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.08)}

/* Canvas Brand Groups */
.cvs-brand-group{margin-bottom:16px;border:1px solid var(--g2);border-radius:12px;overflow:hidden}
.cvs-brand-group-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;cursor:pointer;font-size:13px;font-weight:600;background:var(--g1)}
.cvs-brand-group-body{padding:14px 16px}
.cvs-font-select{width:100%;padding:8px 12px;border-radius:8px;border:1px solid var(--g2);font-size:12px;background:var(--sf);color:var(--tx);font-family:var(--sans);cursor:pointer;appearance:auto}

/* Domain Section */
.cvs-domain-url{display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--g1);border-radius:10px;font-size:13px;margin-bottom:12px}
.cvs-domain-url span{color:var(--g5)}
.cvs-domain-url strong{color:var(--ac);font-weight:600}
.cvs-dns-table{width:100%;border-collapse:collapse;font-size:12px;margin:12px 0}
.cvs-dns-table th{text-align:left;padding:8px 12px;background:var(--g1);font-weight:600;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--g4)}
.cvs-dns-table td{padding:8px 12px;border-top:1px solid var(--g2);font-family:var(--mono);font-size:11px}
.cvs-domain-status{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.05em}
.cvs-domain-status.pending{background:rgba(245,166,35,.1);color:var(--amber)}
.cvs-domain-status.verified{background:rgba(29,185,84,.1);color:var(--green)}

/* Canvas Template Animations */
@keyframes cvsFadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes cvsScaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes cvsFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes cvsPulse{0%,100%{box-shadow:0 0 0 0 rgba(96,77,255,.3)}50%{box-shadow:0 0 0 12px rgba(96,77,255,0)}}
@keyframes cvsGradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.cvs-anim-section{animation:cvsFadeInUp .6s ease both}
.cvs-anim-card{animation:cvsScaleIn .4s ease both}
.cvs-anim-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.12);transition:all .25s ease}
.cvs-anim-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.15);transition:all .2s ease}
.cvs-parallax-hero{background-attachment:fixed!important;background-size:cover!important;background-position:center!important}
.cvs-hover-lift{transition:transform .3s ease,box-shadow .3s ease}.cvs-hover-lift:hover{transform:translateY(-6px);box-shadow:0 12px 32px rgba(0,0,0,.12)}
.cvs-hover-glow:hover{box-shadow:0 0 20px rgba(96,77,255,.2)}

/* Faculty Settings */
.cvs-faculty-card{display:flex;align-items:center;gap:16px;padding:16px;border:1px solid var(--g2);border-radius:12px;margin-bottom:8px}
.cvs-faculty-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;background:var(--g1)}
.cvs-faculty-info{flex:1;min-width:0}
.cvs-faculty-name{font-size:14px;font-weight:600}
.cvs-faculty-role{font-size:12px;color:var(--ac);font-family:var(--mono);margin-top:2px}

/* Fullscreen Preview */
.cvs-fullscreen{position:fixed;inset:0;z-index:300;background:var(--bg);overflow-y:auto;animation:cvsFadeInUp .3s ease}
.cvs-fullscreen-bar{position:sticky;top:0;z-index:301;display:flex;align-items:center;justify-content:space-between;padding:8px 20px;background:rgba(0,0,0,.85);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.1)}
.cvs-fullscreen-bar .cvs-device-toggle{background:rgba(255,255,255,.1);border-radius:8px;padding:2px}
.cvs-fullscreen-bar .cvs-device-btn{color:rgba(255,255,255,.6)}
.cvs-fullscreen-bar .cvs-device-btn.active{color:#fff;background:rgba(255,255,255,.15)}

/* New Animation Keyframes */
@keyframes cvsSlideInRight{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}
@keyframes cvsSlideInLeft{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:translateX(0)}}
@keyframes cvsPopIn{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
@keyframes cvsBounceIn{0%{opacity:0;transform:scale(.3)}50%{transform:scale(1.05)}70%{transform:scale(.95)}100%{opacity:1;transform:scale(1)}}
@keyframes cvsStackIn{from{opacity:0;transform:translateY(100px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes cvsDrawLine{from{height:0}to{height:100%}}
@keyframes cvsGlowPulse{0%,100%{box-shadow:0 0 20px rgba(167,139,250,.2)}50%{box-shadow:0 0 40px rgba(167,139,250,.4)}}
@keyframes cvsGradientMesh{0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%}}
.cvs-anim-slide-r{animation:cvsSlideInRight .6s ease both}
.cvs-anim-slide-l{animation:cvsSlideInLeft .6s ease both}
.cvs-anim-pop{animation:cvsPopIn .5s ease both}
.cvs-anim-bounce{animation:cvsBounceIn .6s ease both}
.cvs-anim-stack{animation:cvsStackIn .5s ease both}

/* Horizon Template */
.cvs-horizon-nav{position:fixed;left:0;top:0;width:56px;height:100%;background:rgba(10,22,40,.95);backdrop-filter:blur(12px);display:flex;flex-direction:column;align-items:center;padding-top:80px;gap:24px;z-index:10;border-right:1px solid rgba(0,212,255,.1)}
.cvs-horizon-dot{width:10px;height:10px;border-radius:50%;background:rgba(0,212,255,.2);transition:all .3s;cursor:pointer}
.cvs-horizon-dot.active{background:#00d4ff;box-shadow:0 0 12px rgba(0,212,255,.5)}
.cvs-horizon-section{min-height:100vh;scroll-snap-align:start;display:flex;align-items:center;padding-left:72px}
.cvs-snap-container{scroll-snap-type:y mandatory;overflow-y:auto;height:100%}

/* Noir Template */
.cvs-noir-stack{position:sticky;top:20px;border-radius:20px;padding:48px;margin-bottom:20px;transition:all .3s}
.cvs-noir-hero{min-height:100vh;display:flex;align-items:center;justify-content:center}
.cvs-noir-hero h1{font-size:clamp(48px,8vw,120px);font-weight:300;line-height:.9;mix-blend-mode:difference}

/* Vivid Template */
.cvs-vivid-mesh{background:linear-gradient(135deg,#667eea,#764ba2,#f093fb,#667eea);background-size:400% 400%;animation:cvsGradientMesh 8s ease infinite}
.cvs-vivid-card{border-radius:24px;padding:32px;background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.08);transition:all .3s}
.cvs-vivid-card:hover{transform:translateY(-6px) rotate(-1deg);box-shadow:0 16px 48px rgba(0,0,0,.12)}
.cvs-vivid-polaroid{background:#fff;padding:8px 8px 32px;border-radius:4px;box-shadow:0 4px 16px rgba(0,0,0,.1);transform:rotate(var(--rot,0deg));transition:transform .3s}
.cvs-vivid-polaroid:hover{transform:rotate(0deg)!important;z-index:2}

/* Chronicle Template */
.cvs-chronicle-line{position:absolute;left:50%;width:2px;background:rgba(139,105,20,.15);transform:translateX(-50%)}
.cvs-chronicle-node{position:relative;display:grid;grid-template-columns:1fr 40px 1fr;gap:0;align-items:start;margin-bottom:60px}
.cvs-chronicle-dot{width:16px;height:16px;border-radius:50%;border:3px solid;margin:4px auto;position:relative;z-index:2;background:#f5f2ed}
.cvs-chronicle-content{padding:0 32px}

/* Prism Template */
.cvs-prism-glass{background:rgba(255,255,255,.08);backdrop-filter:blur(20px);border:1px solid rgba(167,139,250,.2);border-radius:20px;padding:40px;transition:all .3s}
.cvs-prism-glass:hover{background:rgba(255,255,255,.12);box-shadow:0 8px 32px rgba(167,139,250,.15)}
.cvs-prism-nav{position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:10;display:flex;gap:4px;padding:6px;background:rgba(255,255,255,.08);backdrop-filter:blur(20px);border-radius:50px;border:1px solid rgba(167,139,250,.15)}
.cvs-prism-nav a{padding:8px 20px;border-radius:50px;font-size:12px;color:rgba(255,255,255,.6);transition:all .2s;cursor:pointer;text-decoration:none}
.cvs-prism-nav a:hover,.cvs-prism-nav a.active{color:#fff;background:rgba(167,139,250,.2)}
.cvs-prism-glow{position:absolute;width:200px;height:200px;border-radius:50%;filter:blur(80px);opacity:.3;pointer-events:none}

/* Basic Mode Toggle */
.cvs-toggle-bar{display:flex;background:var(--g1);border-radius:12px;padding:4px;margin-bottom:20px}
.cvs-toggle-opt{flex:1;padding:10px 16px;border-radius:10px;border:none;cursor:pointer;font-size:13px;font-weight:500;display:flex;align-items:center;gap:8px;justify-content:center;background:transparent;color:var(--g5);transition:all .2s;font-family:var(--sans)}
.cvs-toggle-opt.active{background:var(--sf);color:var(--ac);font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.06)}

/* Fullscreen Builder */
.cvs-builder-fullscreen{position:fixed;inset:0;z-index:999;background:#F8F7FF;display:flex;flex-direction:column;animation:cvsFadeInUp .2s ease}
.dark .cvs-builder-fullscreen{background:#0D0D12}
.cvs-builder-topbar{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;border-bottom:1px solid var(--g2);flex-shrink:0;background:var(--sf);gap:12px;z-index:2}

/* Premium Animations */
@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideInRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(96,77,255,.3)}50%{box-shadow:0 0 20px 4px rgba(96,77,255,.15)}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Animation utility classes */
.anim-fade-in{animation:fadeIn .4s ease-out}
.anim-fade-up{animation:fadeInUp .5s ease-out both}
.anim-scale-in{animation:scaleIn .3s ease-out}
.anim-slide-right{animation:slideInRight .4s ease-out}
.anim-slide-left{animation:slideInLeft .4s ease-out}

/* Card hover effects */
.card-hover{transition:all .25s ease}
.card-hover:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.3)}

/* Button press effect */
.btn-press{transition:all .15s ease}
.btn-press:active{transform:scale(.97)}

/* Stat number animation */
.stat-num{animation:countUp .5s ease-out}

/* Status badge pulse */
.status-pulse{animation:pulseGlow 2s ease-in-out infinite}

/* Smooth toggle */
.toggle-smooth{transition:all .25s cubic-bezier(.4,0,.2,1)}

/* Premium card shine effect on hover */
.card-shine{position:relative;overflow:hidden}
.card-shine::before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,.03) 50%,transparent 60%);transition:transform .6s;transform:translateX(-100%);z-index:1;pointer-events:none}
.card-shine:hover::before{transform:translateX(100%)}

/* Smooth sidebar transitions */
.sidebar-item{transition:all .2s ease}
.sidebar-item:hover{background:rgba(96,77,255,.08);transform:translateX(4px)}

/* Modal backdrop blur animation */
.modal-enter{animation:fadeIn .2s ease-out}

/* Chip/tag hover */
.chip-hover{transition:all .15s}
.chip-hover:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.2)}

/* Program card entrance - enhance existing */
.prog-card.card-shine{overflow:hidden}

/* Applicant cards staggered entrance */
.app-card-enter{animation:scaleIn .3s ease-out backwards}

/* ========== RESPONSIVE: Tablet / Mobile ========== */
@media (max-width: 768px) {
  /* Sidebar becomes bottom nav */
  .sidebar { width: 100% !important; height: auto !important; position: fixed !important; bottom: 0 !important; top: auto !important; flex-direction: row !important; z-index: 100 !important; padding: 8px 0 !important; }
  .sidebar nav { flex-direction: row !important; justify-content: space-around !important; width: 100% !important; }
  .sidebar nav button { flex-direction: column !important; font-size: 10px !important; padding: 6px 0 !important; }
  .sidebar .sidebar-bottom { display: none !important; }

  /* Main content */
  .main-content, .main, main.main { margin-left: 0 !important; padding-bottom: 70px !important; }

  /* Program cards grid */
  .prog-card { margin: 0 12px 16px !important; }

  /* Stat grid */
  .stat-grid { grid-template-columns: 1fr 1fr !important; }

  /* Applicant filters */
  .app-filters { flex-wrap: wrap !important; gap: 6px !important; }
  .app-filters .chip { font-size: 11px !important; padding: 4px 10px !important; }

  /* Canvas builder */
  .cvs-builder, .cvs-editor { flex-direction: column !important; }
  .cvs-builder > div:first-child, .cvs-editor > div:first-child { width: 100% !important; max-height: 300px !important; overflow-y: auto !important; }

  /* Settings */
  .settings-grid { grid-template-columns: 1fr !important; }

  /* Workshop catalog cards */
  [style*="gridTemplateColumns: repeat(auto-fill, minmax(340px"] { grid-template-columns: 1fr !important; }

  /* Participant table */
  .participant-row { flex-wrap: wrap !important; }

  /* Payment methods grid */
  [style*="gridTemplateColumns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }

  /* Model selector */
  .model-select, .cvs-mode-selector { grid-template-columns: 1fr 1fr !important; }

  /* Share modal */
  .share-modal { width: 95vw !important; max-width: none !important; }

  /* Header breadcrumbs */
  .content-header { flex-wrap: wrap !important; gap: 8px !important; }
}

/* ========== RESPONSIVE: Small Mobile ========== */
@media (max-width: 480px) {
  .stat-grid { grid-template-columns: 1fr !important; }
  .model-select, .cvs-mode-selector { grid-template-columns: 1fr !important; }
  [style*="gridTemplateColumns: repeat(2"] { grid-template-columns: 1fr !important; }
}
`;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const processPayment = async (amount, currency = "EUR") => {
  await new Promise(r => setTimeout(r, 1500));
  return { id: 'pi_mock_' + Date.now(), status: 'succeeded', amount, currency };
};

const connectStripeAccount = async () => {
  await new Promise(r => setTimeout(r, 1000));
  return { accountId: 'acct_mock_' + Date.now(), status: 'active' };
};

const formatCurrency = (amount, currency = "EUR") => {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency }).format(amount);
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24);
  return Math.ceil(diff);
};

const getInitials = (name) => name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

const programTypeEmoji = (type) => ({ intensive: "\uD83D\uDD25", workshop: "\u26A1", masterclass: "\uD83C\uDF93" }[type] || "\uD83D\uDCCB");

const statusLabel = (s) => ({ submitted: "New", under_review: "Reviewing", accepted: "Accepted", scholarship: "Scholarship", waitlisted: "Waitlisted", rejected: "Rejected" }[s] || s);

// === COMPONENT START ===

const I = ({ n, s = 18 }) => <Icon name={n} size={s} />;

function BoxOfficeShell() {
  // Auth
  const [auth, setAuth] = useState("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");

  // Demo popup
  const [showDemoPopup, setShowDemoPopup] = useState(true);

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('lanced-dark-mode') === 'true');

  // Navigation
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Program detail context
  const [viewProgram, setViewProgram] = useState(null);
  const [programPage, setProgramPage] = useState("overview");

  // Public/artist view
  const [publicView, setPublicView] = useState(null);
  const [artistView, setArtistView] = useState(null);

  // Data
  const [programs, setPrograms] = useState(MOCK_PROGRAMS);
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  // Modals
  const [showNewProgram, setShowNewProgram] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showApplicantDetail, setShowApplicantDetail] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  // Forms
  const [newProg, setNewProg] = useState({ model: "A", name: "", description: "", type: "intensive", location: "", venue: "", startDate: "", endDate: "", applicationDeadline: "", confirmationDeadline: "", capacity: 0, basePrice: "", earlyBirdPrice: "", currency: "EUR", paymentMode: "full" });

  // Applicant filters
  const [appSearch, setAppSearch] = useState("");
  const [appFilter, setAppFilter] = useState("all");
  const [selectedApps, setSelectedApps] = useState([]);
  const [batchAction, setBatchAction] = useState("");
  const [appViewMode, setAppViewMode] = useState("grid");
  const [appSort, setAppSort] = useState("newest");
  const [showAdvFilters, setShowAdvFilters] = useState(false);
  const [advFilters, setAdvFilters] = useState({ ageMin: "", ageMax: "", nationality: "", location: "", level: "", styles: "" });
  const [reviewingApp, setReviewingApp] = useState(null);
  const [appNotes, setAppNotes] = useState({});
  const [newNote, setNewNote] = useState("");
  const [expandedSections, setExpandedSections] = useState({ motivation: true, experience: true, videos: true, photos: true, files: true });

  // Communication
  const [composeMsg, setComposeMsg] = useState({ segment: "all", subject: "", body: "", template: "" });

  // Checkout (public view)
  const [checkoutQty, setCheckoutQty] = useState(1);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Application form (public view)
  const [applyForm, setApplyForm] = useState({ name: "", email: "", age: "", nationality: "", location: "", motivation: "", experience: "" });
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Toast
  const [toast, setToast] = useState("");

  // Settings tab
  const [settingsTab, setSettingsTab] = useState("profile");

  // Program settings tabs
  const [progSettingsTab, setProgSettingsTab] = useState("general");
  const [newScholarship, setNewScholarship] = useState({ name: "", discount: "", note: "" });
  const [editScholarship, setEditScholarship] = useState(null);
  const [newRefundRule, setNewRefundRule] = useState({ daysBefore: "", refundPercent: "" });
  const [newFaq, setNewFaq] = useState({ q: "", a: "" });
  const [editFaq, setEditFaq] = useState(null);
  const [editWeek, setEditWeek] = useState(null);
  const [newWeek, setNewWeek] = useState({ name: "", startDate: "", endDate: "", capacity: "", price: "" });
  const [weekFilter, setWeekFilter] = useState("all");

  // Canvas Builder
  const [canvasMode, setCanvasMode] = useState(null);
  const [canvasStep, setCanvasStep] = useState(0);
  const [canvasTemplate, setCanvasTemplate] = useState(null);
  const [canvasSections, setCanvasSections] = useState([]);
  const [canvasBrand, setCanvasBrand] = useState({ accentColor: "#604dff", fontPairId: "instrument-outfit", logoUrl: null, heroMediaUrl: null, titleColor: null, titleFont: null, bodyColor: null, bodyFont: null, buttonColor: null, buttonTextColor: null, buttonFont: null, customDomain: "", slug: "" });
  const [canvasPreviewDevice, setCanvasPreviewDevice] = useState("desktop");
  const [canvasDragIdx, setCanvasDragIdx] = useState(null);
  const [canvasCustomizeTab, setCanvasCustomizeTab] = useState("sections");
  const [canvasDomainVerified, setCanvasDomainVerified] = useState(false);
  const [canvasFullscreen, setCanvasFullscreen] = useState(false);
  const [canvasBuilderExpanded, setCanvasBuilderExpanded] = useState(false);
  const [shareTab, setShareTab] = useState("link");
  const [embedSize, setEmbedSize] = useState("medium");
  const [newFaculty, setNewFaculty] = useState({ name: "", role: "", bio: "", photo: "" });
  const [editFaculty, setEditFaculty] = useState(null);

  // Model B (Modular Intensive)
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [workshopCart, setWorkshopCart] = useState([]);
  const [cartCheckoutProcessing, setCartCheckoutProcessing] = useState(false);
  const [cartCheckoutComplete, setCartCheckoutComplete] = useState(false);
  const [workshopFilter, setWorkshopFilter] = useState({ style: "all", level: "all" });
  const [workshopBookings, setWorkshopBookings] = useState(MOCK_WORKSHOP_BOOKINGS);
  const [newWorkshop, setNewWorkshop] = useState(null);
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [newBundle, setNewBundle] = useState(null);
  const [editBundle, setEditBundle] = useState(null);

  // Artist Auth
  const [artistAuth, setArtistAuth] = useState(null);
  const [showArtistAuthModal, setShowArtistAuthModal] = useState(false);
  const [artistAuthTab, setArtistAuthTab] = useState("login");
  const [artistAuthForm, setArtistAuthForm] = useState({ name: "", email: "", password: "" });
  const [applyStep, setApplyStep] = useState(0);

  // Inline Content Editing
  const [canvasEditMode, setCanvasEditMode] = useState(false);
  const [canvasEditTarget, setCanvasEditTarget] = useState(null);
  const [canvasContentOverrides, setCanvasContentOverrides] = useState({});

  // Payment Settings
  const [paymentProvider, setPaymentProvider] = useState({ stripe: { connected: true, liveKey: "pk_live_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u20221234", secretKey: "sk_live_\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u20225678" }, mollie: { connected: false, apiKey: "" } });
  const [paymentMethods, setPaymentMethods] = useState({ creditCard: true, ideal: false, bancontact: false, sepa: true, paypal: false, klarna: false, applePay: true, googlePay: false });
  const [paymentCurrency, setPaymentCurrency] = useState("EUR");
  const [paymentVat, setPaymentVat] = useState({ enabled: false, rate: 21, inclusive: true });
  const [businessDetails, setBusinessDetails] = useState({ legalName: "Amsterdam Dance Centre B.V.", address: "Keizersgracht 123", city: "Amsterdam", postalCode: "1015 AB", country: "Netherlands", vatNumber: "NL123456789B01", cocNumber: "12345678", email: "billing@adc-dance.com" });
  const [showPaymentSetup, setShowPaymentSetup] = useState(null);

  // Application Form Builder
  const [appFormEditing, setAppFormEditing] = useState(null); // custom question being edited inline
  const [appFormNewQ, setAppFormNewQ] = useState(null); // new custom question form

  const STANDARD_MATERIALS = [
    { id: "headshot", label: "Headshot Photo", icon: "camera", desc: "Professional headshot" },
    { id: "dance_reel", label: "Dance Reel / Video", icon: "video", desc: "Performance or audition video" },
    { id: "cv", label: "CV / Resume", icon: "file", desc: "Dance resume or CV" },
    { id: "motivation_letter", label: "Motivation Letter", icon: "edit", desc: "Why they want to participate" },
    { id: "portfolio", label: "Portfolio / Photos", icon: "image", desc: "Additional photos or portfolio" },
    { id: "medical_form", label: "Medical Form", icon: "heart", desc: "Health and medical clearance" },
    { id: "references", label: "References", icon: "users", desc: "Professional references" }
  ];

  const STANDARD_FIELDS = [
    { id: "age", label: "Age" },
    { id: "nationality", label: "Nationality" },
    { id: "location", label: "City / Location" },
    { id: "experience_level", label: "Experience Level" },
    { id: "dance_styles", label: "Dance Styles" },
    { id: "availability", label: "Availability" },
    { id: "phone", label: "Phone Number" }
  ];

  const QUESTION_TYPES = [
    { id: "text", label: "Short Text" },
    { id: "textarea", label: "Long Text" },
    { id: "select", label: "Single Choice" },
    { id: "multiselect", label: "Multiple Choice" },
    { id: "checkbox", label: "Checkbox" },
    { id: "number", label: "Number" },
    { id: "file", label: "File Upload" }
  ];

  const getAppConfig = (prog) => prog.applicationConfig || { materials: prog.applicationFields || [], fields: [], customQuestions: [] };

  const updateAppConfig = (progId, updater) => {
    setPrograms(ps => ps.map(p => {
      if (p.id !== progId) return p;
      const current = getAppConfig(p);
      const updated = typeof updater === "function" ? updater(current) : updater;
      return { ...p, applicationConfig: updated };
    }));
  };

  // Communication
  const [commTab, setCommTab] = useState("templates");
  const [marketingTab, setMarketingTab] = useState("promo");
  const [programTemplates, setProgramTemplates] = useState([
    { id:"tpl1", category:"confirmation", name:"Welcome & Confirmation", message:"Dear [first_name],\n\nCongratulations! We're thrilled to confirm your spot in [program_title].\n\nPlease complete your payment by [date] to secure your place.\n\nWe look forward to seeing you at [location]!\n\nBest regards,\n[org_name]" },
    { id:"tpl2", category:"reminder", name:"Payment Reminder", message:"Dear [first_name],\n\nThis is a friendly reminder that your payment for [program_title] is due soon.\n\nPlease complete your payment to keep your spot.\n\nBest regards,\n[org_name]" },
    { id:"tpl3", category:"update", name:"Schedule Update", message:"Dear [first_name],\n\nWe have an important update regarding the schedule for [program_title].\n\nPlease check the program page for the latest information.\n\nBest regards,\n[org_name]" },
    { id:"tpl4", category:"waitlist", name:"Waitlist Notification", message:"Dear [first_name],\n\nThank you for applying to [program_title]. You have been placed on our waitlist.\n\nWe will notify you immediately if a spot becomes available.\n\nBest regards,\n[org_name]" },
    { id:"tpl5", category:"rejection", name:"Application Declined", message:"Dear [first_name],\n\nThank you for your interest in [program_title]. After careful review, we are unable to offer you a place at this time.\n\nWe encourage you to apply again in the future.\n\nBest regards,\n[org_name]" }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [broadcastLog, setBroadcastLog] = useState([
    { id:"bl1", name:"Welcome & Confirmation", recipientCount:3, sentAt:"Mar 15, 2026", status:"sent", category:"confirmation" },
    { id:"bl2", name:"Payment Reminder", recipientCount:2, sentAt:"Mar 18, 2026", status:"sent", category:"reminder" }
  ]);
  const [broadcastRecipients, setBroadcastRecipients] = useState("all");
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  // Expanded participant
  const [expandedParticipant, setExpandedParticipant] = useState(null);

  // Mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Programs page filters
  const [progSearch, setProgSearch] = useState("");
  const [progTypeFilter, setProgTypeFilter] = useState("all");
  const [progStatusFilter, setProgStatusFilter] = useState("all");

  // === EFFECTS ===
  useEffect(() => { localStorage.setItem('lanced-dark-mode', darkMode ? 'true' : 'false'); }, [darkMode]);
  useEffect(() => { window.scrollTo({top:0,behavior:"instant"}); }, [page, programPage, viewProgram, publicView]);
  useEffect(() => { const h = (e) => { if(e.key==="Escape") { setShowNewProgram(false); setShowShareModal(false); setShowApplicantDetail(null); setShowCancelModal(null); setShowConfirmDialog(null); setMobileMenuOpen(false); setCanvasFullscreen(false); setCanvasBuilderExpanded(false); }}; window.addEventListener("keydown",h); return ()=>window.removeEventListener("keydown",h); }, []);
  useEffect(() => { if(toast) { const t=setTimeout(()=>setToast(""),3000); return ()=>clearTimeout(t); }}, [toast]);

  const showToastMsg = (msg) => setToast(msg);

  // === COMPUTED VALUES ===
  const orgPrograms = programs;
  const allApplications = applications;
  const programApps = viewProgram ? applications.filter(a => a.programId === viewProgram.id) : [];
  const programParticipants = viewProgram ? participants.filter(p => p.programId === viewProgram.id) : [];
  const programPayments = viewProgram ? payments.filter(p => p.programId === viewProgram.id) : [];
  const programTickets = viewProgram ? tickets.filter(t => t.programId === viewProgram.id) : [];
  const programMessages = viewProgram ? messages.filter(m => m.programId === viewProgram.id) : [];

  const totalRevenue = payments.filter(p => p.status === "succeeded").reduce((s, p) => s + p.amount, 0) + tickets.filter(t => t.status === "confirmed").reduce((s, t) => s + t.amount, 0);
  const pendingRevenue = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalApplications = applications.length;
  const activePrograms = programs.filter(p => p.status === "published").length;

  const revenueByMonth = [
    { month: "Oct", amount: 0 },{ month: "Nov", amount: 200 },{ month: "Dec", amount: 450 },
    { month: "Jan", amount: 800 },{ month: "Feb", amount: 1200 },{ month: "Mar", amount: totalRevenue }
  ];
  const maxRevenue = Math.max(...revenueByMonth.map(r => r.amount), 1);

  const activeFilterCount = [advFilters.ageMin, advFilters.ageMax, advFilters.nationality, advFilters.location, advFilters.level, advFilters.styles].filter(v => v !== "").length;
  const filteredApps = programApps.filter(a => {
    if (appFilter !== "all" && a.status !== appFilter) return false;
    if (appSearch && !a.name.toLowerCase().includes(appSearch.toLowerCase()) && !a.email.toLowerCase().includes(appSearch.toLowerCase())) return false;
    if (advFilters.ageMin && (parseInt(a.age) || 0) < parseInt(advFilters.ageMin)) return false;
    if (advFilters.ageMax && (parseInt(a.age) || 999) > parseInt(advFilters.ageMax)) return false;
    if (advFilters.nationality && !(a.nationality || "").toLowerCase().includes(advFilters.nationality.toLowerCase())) return false;
    if (advFilters.location && !(a.location || "").toLowerCase().includes(advFilters.location.toLowerCase())) return false;
    if (advFilters.level && (a.experienceLevel || "") !== advFilters.level) return false;
    if (advFilters.styles && !(((a.styles || []).join(" ") + " " + (a.danceStyles || "")).toLowerCase()).includes(advFilters.styles.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (appSort === "newest") return new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0);
    if (appSort === "name") return (a.name || "").localeCompare(b.name || "");
    if (appSort === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  // === HANDLERS ===
  const openProgram = (prog) => { setViewProgram(prog); setProgramPage("overview"); setAppSearch(""); setAppFilter("all"); setSelectedApps([]); setReviewingApp(null); setAppViewMode("grid"); setAppSort("newest"); setNewNote(""); setProgSettingsTab("general"); setCommTab("templates"); setMarketingTab("promo"); setSelectedTemplate(null); setEditingTemplate(null); setEditScholarship(null); setNewRefundRule({ daysBefore: "", refundPercent: "" }); setNewFaq({ q: "", a: "" }); setEditFaq(null); setEditWeek(null); setNewWeek({ name: "", startDate: "", endDate: "", capacity: "", price: "" }); };
  const closeProgram = () => { setViewProgram(null); setProgramPage("overview"); };

  const createProgram = () => {
    if (!newProg.name) return;
    const p = {
      id: "p" + Date.now(),
      ...newProg,
      type: newProg.model === "A" ? "intensive" : newProg.model === "D" ? "workshop" : newProg.type || "workshop",
      model: newProg.model,
      status: "draft",
      scholarshipTiers: [],
      refundPolicy: [{ daysBefore: 14, refundPct: 80 }, { daysBefore: 7, refundPct: 50 }, { daysBefore: 0, refundPct: 0 }],
      applicationFields: newProg.model === "A" ? ["headshot", "dance_reel", "motivation_letter"] : newProg.model === "D" ? ["experience_level"] : [],
      ...(newProg.model === "B" ? { type: "festival", applicationFields: [], workshops: [], bundlePricing: [], selectionMode: "none" } : {}),
      applicationFee: 0,
      styles: [],
      createdAt: new Date().toISOString().split("T")[0]
    };
    setPrograms(prev => [p, ...prev]);
    setShowNewProgram(false);
    setNewProg({ model: "A", name: "", description: "", type: "intensive", location: "", venue: "", startDate: "", endDate: "", applicationDeadline: "", confirmationDeadline: "", capacity: 0, basePrice: "", earlyBirdPrice: "", currency: "EUR", paymentMode: "full" });
    openProgram(p);
    setProgramPage("settings");
    setProgSettingsTab("general");
    setToast("Program created!");
  };

  const updateAppStatus = (appId, status, scholarshipTierId = null) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status, scholarshipTierId, reviewedAt: new Date().toISOString() } : a));
    if (reviewingApp && reviewingApp.id === appId) {
      setReviewingApp(prev => prev ? { ...prev, status, scholarshipTierId, reviewedAt: new Date().toISOString() } : null);
    } else {
      setShowApplicantDetail(null);
    }
    setToast(`Applicant ${status === "accepted" ? "accepted" : status === "rejected" ? "rejected" : status === "shortlisted" ? "shortlisted" : status}`);
  };

  const batchUpdateStatus = (status) => {
    setApplications(prev => prev.map(a => selectedApps.includes(a.id) ? { ...a, status, reviewedAt: new Date().toISOString() } : a));
    setSelectedApps([]);
    setToast(`${selectedApps.length} applicants updated`);
  };

  const toggleSelectApp = (appId) => {
    setSelectedApps(prev => prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]);
  };

  const sendMessage = () => {
    if (!composeMsg.subject || !composeMsg.body) return;
    const msg = { id: "m" + Date.now(), programId: viewProgram.id, segment: composeMsg.segment, subject: composeMsg.subject, body: composeMsg.body, sentAt: new Date().toISOString().split("T")[0], sentBy: "Admin" };
    setMessages(prev => [msg, ...prev]);
    setComposeMsg({ segment: "all", subject: "", body: "", template: "" });
    setToast("Message sent!");
  };

  const handleApplyTemplate = (templateId) => {
    const tpl = MESSAGE_TEMPLATES.find(t => t.id === templateId);
    if (tpl) setComposeMsg(prev => ({ ...prev, subject: tpl.subject, body: tpl.body, template: templateId }));
  };

  const submitApplication = () => {
    if (!applyForm.name || !applyForm.email) return;
    const app = { id: "a" + Date.now(), programId: publicView, name: applyForm.name, email: applyForm.email, age: parseInt(applyForm.age) || null, nationality: applyForm.nationality, location: applyForm.location, status: "submitted", motivation: applyForm.motivation, experience: applyForm.experience, media: [], headshot: null, submittedAt: new Date().toISOString(), rating: null, notes: "" };
    setApplications(prev => [...prev, app]);
    setApplySubmitted(true);
    setToast("Application submitted!");
  };

  const purchaseTicket = async () => {
    setCheckoutProcessing(true);
    const prog = programs.find(p => p.id === publicView);
    const amount = (checkoutQty * (prog?.basePrice || 0));
    await processPayment(amount, prog?.currency || "EUR");
    const ticket = { id: "t" + Date.now(), programId: publicView, buyerName: "Guest Buyer", buyerEmail: "guest@example.com", quantity: checkoutQty, amount, status: "confirmed", purchasedAt: new Date().toISOString(), ticketCode: `TK-${Date.now()}` };
    setTickets(prev => [...prev, ticket]);
    setCheckoutProcessing(false);
    setCheckoutComplete(true);
    setToast("Tickets purchased!");
  };

  const processCancellation = (participantId) => {
    setParticipants(prev => prev.map(p => p.id === participantId ? { ...p, status: "cancelled", paymentStatus: "refunded" } : p));
    setShowCancelModal(null);
    setToast("Cancellation processed");
  };

  const publishProgram = (progId) => {
    setPrograms(prev => prev.map(p => p.id === progId ? { ...p, status: "published" } : p));
    if (viewProgram && viewProgram.id === progId) setViewProgram(prev => ({ ...prev, status: "published" }));
    setToast("Program published!");
  };

  const deleteProgram = (progId) => {
    setPrograms(prev => prev.filter(p => p.id !== progId));
    if (viewProgram && viewProgram.id === progId) closeProgram();
    setShowConfirmDialog(null);
    setToast("Program deleted");
  };

  // === RENDER: AUTH ===
  const renderAuth = () => (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">S</div>
        {auth === "login" ? (
          <>
            <h2>Welcome back</h2>
            <p className="auth-sub">Sign in to your store dashboard</p>
            <input type="email" placeholder="Email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={authPass} onChange={e => setAuthPass(e.target.value)} />
            <button className="auth-btn" onClick={() => setAuth("app")}>Sign In</button>
            <p className="auth-switch">Don't have an account? <a onClick={() => setAuth("signup")}>Create one</a></p>
          </>
        ) : (
          <>
            <h2>Create your account</h2>
            <p className="auth-sub">Set up your organization on Lanced Store</p>
            <input type="text" placeholder="Organization name" value={authName} onChange={e => setAuthName(e.target.value)} />
            <input type="email" placeholder="Email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={authPass} onChange={e => setAuthPass(e.target.value)} />
            <button className="auth-btn" onClick={() => setAuth("app")}>Create Account</button>
            <p className="auth-switch">Already have an account? <a onClick={() => setAuth("login")}>Sign in</a></p>
          </>
        )}
      </div>
    </div>
  );

  // === RENDER: SIDEBAR ===
  const renderSidebar = () => {
    const collapsed = sidebarCollapsed;

    if (viewProgram) {
      const newProgramApps = programApps.filter(a => a.status === "submitted").length;
      return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <button className="sb-toggle" onClick={()=>setSidebarCollapsed(!collapsed)} title={collapsed?"Expand sidebar":"Collapse sidebar"}>
            <I n={collapsed?"chevronRight":"chevronLeft"} s={12} />
          </button>
          <div className="sb-header">
            <div className="sb-logo">
              <div className="sb-logo-icon">S</div>
              <div className="sb-logo-text">Lanced<span>{MOCK_ORG.name}</span></div>
            </div>
          </div>
          <nav>
            <button onClick={closeProgram} data-tip="Back">
              <span className="sb-icon"><I n="arrowLeft" s={18} /></span>
              <span>Back to Workspace</span>
            </button>
            {[
              {id:"overview",icon:"grid",label:"Overview"},
              ...(["A","D"].includes(viewProgram.model) ? [{id:"applicants",icon:"users",label:"Applicants",badge:newProgramApps}] : []),
              ...(viewProgram.model === "B" ? [{id:"bookings",icon:"shoppingCart",label:"Bookings"}] : []),
              {id:"participants",icon:"userCheck",label:"Participants"},
              {id:"finances",icon:"dollar",label:"Finances"},
              {id:"marketing",icon:"trendingUp",label:"Marketing"},
              {id:"communication",icon:"mail",label:"Communication"},
              {id:"schedule",icon:"calendar",label:"Schedule"},
              {id:"settings",icon:"settings",label:"Settings"}
            ].map(item => (
              <button key={item.id} className={`sidebar-item ${programPage===item.id?"active":""}`} onClick={()=>{setProgramPage(item.id);if(item.id==="marketing"&&viewProgram)initCanvasState(viewProgram);}} data-tip={item.label}>
                <span className="sb-icon"><I n={item.icon} s={18} /></span>
                <span>{item.label}</span>
                {item.badge > 0 && <span className="sb-badge">{item.badge}</span>}
              </button>
            ))}
          </nav>
          <div className="sb-footer">
            <button onClick={()=>setDarkMode(!darkMode)} data-tip={darkMode?"Light":"Dark"}>
              <span className="sb-icon"><I n={darkMode?"sun":"moon"} s={16} /></span>
              <span>{darkMode?"Light Mode":"Dark Mode"}</span>
            </button>
            <div className="sb-acct">
              <div className="sb-avatar">{getInitials(MOCK_ORG.name)}</div>
              <div className="sb-acct-info">
                <div className="sb-acct-name">{MOCK_ORG.name}</div>
                <div className="sb-acct-email">{MOCK_ORG.email}</div>
              </div>
            </div>
            <button onClick={()=>{setAuth("login");closeProgram();}}>
              <span className="sb-icon"><I n="logOut" s={16} /></span>
              <span>Log out</span>
            </button>
          </div>
        </aside>
      );
    }

    return (
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="sb-toggle" onClick={()=>setSidebarCollapsed(!collapsed)} title={collapsed?"Expand sidebar":"Collapse sidebar"}>
          <I n={collapsed?"chevronRight":"chevronLeft"} s={12} />
        </button>
        <div className="sb-header">
          <div className="sb-logo">
            <div className="sb-logo-icon">S</div>
            <div className="sb-logo-text">Lanced<span>{MOCK_ORG.name}</span></div>
          </div>
        </div>
        <nav>
          {[
            {id:"dashboard",icon:"home",label:"Dashboard"},
            {id:"programs",icon:"grid",label:"Programs"},
            {id:"finances",icon:"dollar",label:"Finances"},
            {id:"settings",icon:"settings",label:"Settings"}
          ].map(item => (
            <button key={item.id} className={`sidebar-item ${page===item.id?"active":""}`} onClick={()=>setPage(item.id)} data-tip={item.label}>
              <span className="sb-icon"><I n={item.icon} s={18} /></span>
              <span>{item.label}</span>
              {item.badge > 0 && <span className="sb-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sb-footer">
          <button onClick={()=>setDarkMode(!darkMode)} data-tip={darkMode?"Light":"Dark"}>
            <span className="sb-icon"><I n={darkMode?"sun":"moon"} s={16} /></span>
            <span>{darkMode?"Light Mode":"Dark Mode"}</span>
          </button>
          <div className="sb-acct">
            <div className="sb-avatar">{getInitials(MOCK_ORG.name)}</div>
            <div className="sb-acct-info">
              <div className="sb-acct-name">{MOCK_ORG.name}</div>
              <div className="sb-acct-email">{MOCK_ORG.email}</div>
            </div>
          </div>
          <button onClick={()=>setAuth("login")}>
            <span className="sb-icon"><I n="logOut" s={16} /></span>
            <span>Log out</span>
          </button>
        </div>
      </aside>
    );
  };

  // === RENDER: MOBILE ACTION BAR ===
  const renderMobileActionBar = () => {
    const title = viewProgram ? viewProgram.name : ({dashboard:"Dashboard",programs:"Programs",applications:"Applications",finances:"Finances",settings:"Settings"}[page] || "Store");
    return (
      <div className="mobile-action-bar">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {viewProgram && <button className="btn btn-g btn-sm" onClick={closeProgram}><I n="arrowLeft" s={16} /></button>}
          <span style={{fontWeight:600,fontSize:15}}>{title}</span>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="btn btn-g btn-sm" onClick={()=>setDarkMode(!darkMode)}><I n={darkMode?"sun":"moon"} s={16} /></button>
          {viewProgram && <button className="btn btn-g btn-sm" onClick={()=>setShowShareModal(true)}><I n="share" s={16} /></button>}
        </div>
      </div>
    );
  };

  // === RENDER: CONTENT HEADER ===
  const renderContentHeader = () => {
    if (!viewProgram) return null;
    return (
      <div className="content-header">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:13,color:"var(--g4)",cursor:"pointer"}} onClick={()=>{closeProgram();setPage("programs");}}>Programs</span>
          <I n="chevronRight" s={12} />
          <span style={{fontSize:13,fontWeight:600}}>{viewProgram.name}</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button className="btn btn-s btn-sm" onClick={()=>setShowShareModal(true)}><I n="share" s={14} /> Share</button>
          <button className="btn btn-s btn-sm" onClick={()=>{setPublicView(viewProgram.id);setArtistView(null);setCheckoutComplete(false);setApplySubmitted(false);}}><I n="eye" s={14} /> Preview</button>
          {viewProgram.status === "draft" && <button className="btn btn-p btn-sm btn-press" onClick={()=>publishProgram(viewProgram.id)}><I n="globe" s={14} /> Publish</button>}
        </div>
      </div>
    );
  };

  // === RENDER: MOBILE NAV ===
  const renderMobileNav = () => (
    <div className="mobile-nav">
      {[
        {id:"dashboard",icon:"home",label:"Dashboard"},
        {id:"programs",icon:"grid",label:"Programs"},
        {id:"finances",icon:"dollar",label:"Finances"},
        {id:"settings",icon:"settings",label:"More"}
      ].map(item => (
        <button key={item.id} className={page===item.id && !viewProgram?"active":""} onClick={()=>{setPage(item.id);setViewProgram(null);}}>
          <I n={item.icon} s={18} />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );

  // === RENDER: WORKSPACE ===
  const renderWorkspace = () => {
    switch(page) {
      case "dashboard": return renderDashboard();
      case "programs": return renderPrograms();
      case "applications": return renderApplications();
      case "finances": return renderFinances();
      case "settings": return renderSettings();
      default: return renderDashboard();
    }
  };

  // === RENDER: DASHBOARD ===
  const renderDashboard = () => (
    <div>
      <div className="pg-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dash-banner">
        <div className="dash-banner-text">
          <div>Welcome back</div>
          <h2>Lanced Store</h2>
          <p>Manage your paid opportunities. You have {activePrograms} active program{activePrograms !== 1 ? "s" : ""}, {totalApplications} total application{totalApplications !== 1 ? "s" : ""}, and {formatCurrency(totalRevenue)} in revenue.</p>
        </div>
      </div>
      <div className="stat-grid">
        <div className="stat-card" style={{animationDelay:".05s"}}>
          <div className="stat-label">Active Programs</div>
          <div className="stat-value">{activePrograms}</div>
          <div className="stat-sub">{programs.length} total</div>
        </div>
        <div className="stat-card" style={{animationDelay:".1s"}}>
          <div className="stat-label">Applications</div>
          <div className="stat-value">{totalApplications}</div>
          <div className="stat-sub">{applications.filter(a=>a.status==="submitted").length} new</div>
        </div>
        <div className="stat-card" style={{animationDelay:".15s"}}>
          <div className="stat-label">Revenue</div>
          <div className="stat-value" style={{color:"var(--green)"}}>{formatCurrency(totalRevenue)}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card" style={{animationDelay:".2s"}}>
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{color:"var(--amber)"}}>{formatCurrency(pendingRevenue)}</div>
          <div className="stat-sub">Awaiting payment</div>
        </div>
      </div>
      <div className="dash-grid">
        <div>
          <div className="dash-section">
            <h3><I n="grid" s={16} /> Recent Programs <span className="ds-count">{programs.length}</span></h3>
            {programs.slice(0, 3).map(prog => (
              <div key={prog.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid var(--g1)",cursor:"pointer"}} onClick={()=>openProgram(prog)}>
                <span style={{fontSize:20}}>{programTypeEmoji(prog.type)}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{prog.name}</div>
                  <div style={{fontSize:11,color:"var(--g4)"}}>{prog.location}</div>
                </div>
                <span className={`prog-status ${prog.status}`}>{prog.status}</span>
                {prog.basePrice && <span style={{fontFamily:"var(--mono)",fontSize:13,fontWeight:600,color:"var(--ac)"}}>{formatCurrency(prog.basePrice, prog.currency)}</span>}
              </div>
            ))}
          </div>
          <div className="dash-section">
            <h3><I n="barChart" s={16} /> Revenue</h3>
            <div className="rev-bars">
              {revenueByMonth.map((r, i) => (
                <div key={i} className="rev-bar" style={{height:`${Math.max((r.amount/maxRevenue)*100, 4)}%`}}>
                  <div className="rev-tip">{r.month}: {formatCurrency(r.amount)}</div>
                </div>
              ))}
            </div>
            <div className="rev-labels">
              {revenueByMonth.map((r, i) => <span key={i}>{r.month}</span>)}
            </div>
          </div>
        </div>
        <div>
          <div className="dash-section">
            <h3><I n="zap" s={16} /> Activity</h3>
            {MOCK_ACTIVITY.map(item => (
              <div key={item.id} className="activity-item">
                <div className={`activity-icon ${item.type}`}><I n={item.icon} s={14} /></div>
                <div>
                  <div className="activity-text">{item.text}</div>
                  <div className="activity-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // === RENDER: PROGRAMS ===
  const renderPrograms = () => {
    const filtered = orgPrograms.filter(p => {
      if (progTypeFilter !== "all" && p.type !== progTypeFilter) return false;
      if (progStatusFilter !== "all" && p.status !== progStatusFilter) return false;
      if (progSearch && !p.name.toLowerCase().includes(progSearch.toLowerCase())) return false;
      return true;
    });

    return (
      <div>
        <div className="pg-header" style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <h1>Programs</h1>
          <button className="btn btn-p btn-press" onClick={()=>setShowNewProgram(true)}><I n="plus" s={16} /> Create Program</button>
        </div>
        <div className="list-toolbar">
          <div className="list-search">
            <I n="search" s={16} />
            <input placeholder="Search programs..." value={progSearch} onChange={e=>setProgSearch(e.target.value)} />
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[{id:"all",label:"All"},{id:"intensive",label:"Intensives"},{id:"workshop",label:"Workshops"},{id:"masterclass",label:"Masterclasses"}].map(t => (
              <button key={t.id} className={`chip ${progTypeFilter===t.id?"on":""}`} onClick={()=>setProgTypeFilter(t.id)}>{t.label}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[{id:"all",label:"All"},{id:"published",label:"Published"},{id:"draft",label:"Draft"},{id:"closed",label:"Closed"}].map(s => (
              <button key={s.id} className={`chip ${progStatusFilter===s.id?"on":""}`} onClick={()=>setProgStatusFilter(s.id)}>{s.label}</button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="es-icon"><I n="grid" s={48} /></div>
            <p>No programs found. Create your first program to get started.</p>
          </div>
        ) : (
          <div className="prog-list">
            {filtered.map(prog => {
              const appCount = applications.filter(a => a.programId === prog.id).length;
              const partCount = participants.filter(p => p.programId === prog.id).length;
              return (
                <div key={prog.id} className={`prog-card ${prog.type} card-shine`} onClick={()=>openProgram(prog)}>
                  <div className={`prog-banner ${prog.type}`} style={prog.coverImage ? {backgroundImage:`url(${prog.coverImage})`,backgroundSize:"cover",backgroundPosition:"center"} : prog.bannerGradient ? {background: prog.bannerGradient} : undefined}>
                    {!prog.coverImage && <span style={{fontSize:40}}>{programTypeEmoji(prog.type)}</span>}
                    {prog.basePrice && <div className="prog-price">{formatCurrency(prog.basePrice, prog.currency)}</div>}
                    {prog.applicationDeadline && <div className="prog-deadline">Deadline: {formatDate(prog.applicationDeadline)}</div>}
                  </div>
                  <div className="prog-body">
                    <span className={`prog-type ${prog.type}`}>{prog.type}</span>
                    <span className={`prog-status ${prog.status}`}>{prog.status}</span>
                    {prog.model && (() => { const mb = { A: { label: "Intensive", bg: "rgba(96,77,255,.15)", color: "#604dff" }, B: { label: "Modular", bg: "rgba(156,39,176,.15)", color: "#CE93D8" }, C: { label: "Ticketed", bg: "rgba(29,185,84,.15)", color: "#1DB954" }, D: { label: "Curated", bg: "rgba(33,150,243,.15)", color: "#2196F3" } }[prog.model]; return mb ? <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",padding:"3px 8px",borderRadius:40,marginLeft:6,background:mb.bg,color:mb.color}}>{mb.label}</span> : null; })()}
                    {prog.canvas?.enabled && prog.canvas?.publishedAt && <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",padding:"3px 8px",borderRadius:40,marginLeft:6,background:"rgba(96,77,255,.08)",color:"var(--ac)"}}>Canvas</span>}
                    <div className="prog-title">{prog.name}</div>
                    <div className="prog-location"><I n="mapPin" s={13} /> {prog.location}</div>
                    <div className="prog-meta">
                      <div className="prog-meta-i"><div className="mv">{partCount}/{prog.capacity}</div><div className="ml">Capacity</div></div>
                      <div className="prog-meta-i"><div className="mv">{appCount}</div><div className="ml">Applications</div></div>
                      <div className="prog-meta-i"><div className="mv">{formatDate(prog.startDate).split(" ").slice(0,2).join(" ")}</div><div className="ml">Start</div></div>
                    </div>
                    {prog.styles && prog.styles.length > 0 && (
                      <div className="prog-tags">
                        {prog.styles.map(s => <span key={s} className="prog-tag">{s}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // === RENDER: APPLICATIONS ===
  const renderApplications = () => (
    <div>
      <div className="pg-header"><h1>Applications</h1></div>
      {allApplications.length === 0 ? (
        <div className="empty-state"><div className="es-icon"><I n="inbox" s={48} /></div><p>No applications yet.</p></div>
      ) : (
        <div style={{background:"var(--sf)",borderRadius:20,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
          <table className="pay-table">
            <thead><tr><th>Applicant</th><th>Program</th><th>Status</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {allApplications.map(app => {
                const prog = programs.find(p => p.id === app.programId);
                return (
                  <tr key={app.id} style={{cursor:"pointer"}} onClick={()=>{if(prog) openProgram(prog); setProgramPage("applicants");}}>
                    <td>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div className="roster-avatar">{app.headshot ? <img src={app.headshot} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} /> : getInitials(app.name)}</div>
                        <div><div style={{fontWeight:600}}>{app.name}</div><div style={{fontSize:11,color:"var(--g4)"}}>{app.email}</div></div>
                      </div>
                    </td>
                    <td style={{fontSize:13,color:"var(--g5)"}}>{prog?.name || "Unknown"}</td>
                    <td><span className={`app-badge ${app.status}`}>{statusLabel(app.status)}</span></td>
                    <td style={{fontSize:12,color:"var(--g4)"}}>{formatDate(app.submittedAt)}</td>
                    <td><button className="btn btn-g btn-sm" onClick={e=>{e.stopPropagation();setShowApplicantDetail(app);}}><I n="eye" s={14} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // === RENDER: FINANCES ===
  const renderFinances = () => {
    const platformFees = payments.filter(p => p.status === "succeeded").reduce((s, p) => s + (p.platformFee || 0), 0);
    const ticketRevenue = tickets.filter(t => t.status === "confirmed").reduce((s, t) => s + t.amount, 0);
    return (
      <div>
        <div className="pg-header"><h1>Finances</h1></div>
        <div className="fin-overview">
          <div className="fin-card collected">
            <div className="fin-amount">{formatCurrency(totalRevenue)}</div>
            <div className="fin-label">Total Collected</div>
          </div>
          <div className="fin-card pending">
            <div className="fin-amount">{formatCurrency(pendingRevenue)}</div>
            <div className="fin-label">Pending</div>
          </div>
          <div className="fin-card" style={{}}>
            <div className="fin-amount" style={{color:"var(--g5)"}}>{formatCurrency(platformFees)}</div>
            <div className="fin-label">Platform Fees</div>
          </div>
        </div>
        <div className="dash-section" style={{marginBottom:24}}>
          <h3><I n="creditCard" s={16} /> Payments</h3>
          <div style={{overflowX:"auto"}}>
            <table className="pay-table">
              <thead><tr><th>Participant</th><th>Program</th><th>Amount</th><th>Fee</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {payments.map(pay => {
                  const part = participants.find(p => p.id === pay.participantId);
                  const prog = programs.find(p => p.id === pay.programId);
                  return (
                    <tr key={pay.id}>
                      <td style={{fontWeight:500}}>{part?.name || "Unknown"}</td>
                      <td style={{fontSize:12,color:"var(--g5)"}}>{prog?.name || "Unknown"}</td>
                      <td style={{fontFamily:"var(--mono)",fontWeight:600}}>{formatCurrency(pay.amount)}</td>
                      <td style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--g4)"}}>{formatCurrency(pay.platformFee || 0)}</td>
                      <td><span className={`pay-status ${pay.status}`}>{pay.status}</span></td>
                      <td style={{fontSize:12,color:"var(--g4)"}}>{formatDate(pay.paidAt || pay.dueDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dash-section">
          <h3><I n="ticket" s={16} /> Ticket Sales</h3>
          <div style={{overflowX:"auto"}}>
            <table className="pay-table">
              <thead><tr><th>Buyer</th><th>Program</th><th>Qty</th><th>Amount</th><th>Status</th><th>Code</th><th>Date</th></tr></thead>
              <tbody>
                {tickets.map(t => {
                  const prog = programs.find(p => p.id === t.programId);
                  return (
                    <tr key={t.id}>
                      <td><div><div style={{fontWeight:500}}>{t.buyerName}</div><div style={{fontSize:11,color:"var(--g4)"}}>{t.buyerEmail}</div></div></td>
                      <td style={{fontSize:12,color:"var(--g5)"}}>{prog?.name || "Unknown"}</td>
                      <td style={{fontFamily:"var(--mono)"}}>{t.quantity}</td>
                      <td style={{fontFamily:"var(--mono)",fontWeight:600}}>{formatCurrency(t.amount)}</td>
                      <td><span className={`pay-status ${t.status}`}>{t.status}</span></td>
                      <td style={{fontFamily:"var(--mono)",fontSize:11}}>{t.ticketCode}</td>
                      <td style={{fontSize:12,color:"var(--g4)"}}>{formatDate(t.purchasedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // === RENDER: SETTINGS ===
  const renderSettings = () => (
    <div>
      <div className="pg-header"><h1>Settings</h1><p>Manage your organization, payments, and team.</p></div>
      <div style={{display:"flex",gap:6,marginBottom:24}}>
        {[{id:"profile",label:"Profile"},{id:"payments",label:"Payments"},{id:"team",label:"Team"},{id:"notifications",label:"Notifications"}].map(t => (
          <button key={t.id} className={`chip ${settingsTab===t.id?"on":""}`} onClick={()=>setSettingsTab(t.id)}>{t.label}</button>
        ))}
      </div>

      {settingsTab === "profile" && (
        <div className="settings-section anim-fade-up">
          <h3>Organization Profile</h3>
          <p className="ss-sub">Your public-facing organization details.</p>
          <div className="field"><label>Organization Name</label><input value={MOCK_ORG.name} readOnly /></div>
          <div className="field"><label>Contact Email</label><input value={MOCK_ORG.email} readOnly /></div>
          <div className="field"><label>Website</label><input placeholder="https://your-website.com" /></div>
          <div className="field"><label>Bio</label><textarea placeholder="Tell us about your organization..." style={{minHeight:80}} /></div>
          <button className="btn btn-p btn-press" style={{marginTop:16}} onClick={()=>showToastMsg("Profile saved")}>Save Changes</button>
        </div>
      )}

      {settingsTab === "payments" && (
        <div>
          {/* Payment Providers */}
          <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
            <h3>Payment Providers</h3>
            <p className="ss-sub">Connect your payment processor to accept payments.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { id: "stripe", name: "Stripe", desc: "Credit cards, SEPA, Apple Pay, Google Pay", color: "#635BFF" },
                { id: "mollie", name: "Mollie", desc: "iDEAL, Bancontact, credit cards, SEPA, PayPal", color: "#000" }
              ].map(prov => {
                const connected = paymentProvider[prov.id]?.connected;
                return (
                  <div key={prov.id} style={{ padding: 20, border: `1px solid ${connected ? "var(--green)" : "var(--g2)"}`, borderRadius: 14, background: connected ? "rgba(29,185,84,.03)" : "var(--sf)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: prov.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 700 }}>{prov.name.charAt(0)}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{prov.name}</div>
                          <div style={{ fontSize: 11, color: "var(--g4)" }}>{prov.desc}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: connected ? "rgba(29,185,84,.1)" : "var(--g1)", color: connected ? "var(--green)" : "var(--g4)" }}>{connected ? "Connected" : "Not Connected"}</span>
                    </div>
                    <button className={connected ? "btn btn-s btn-sm" : "btn btn-p btn-sm"} onClick={() => setShowPaymentSetup(prov.id)}>{connected ? "Manage" : "Setup"}</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
            <h3>Payment Methods</h3>
            <p className="ss-sub">Enable the payment methods you want to offer.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { id: "creditCard", name: "Credit Card", icon: "creditCard" },
                { id: "ideal", name: "iDEAL", icon: "dollar" },
                { id: "bancontact", name: "Bancontact", icon: "dollar" },
                { id: "sepa", name: "SEPA Direct Debit", icon: "receipt" },
                { id: "paypal", name: "PayPal", icon: "globe" },
                { id: "klarna", name: "Klarna", icon: "tag" },
                { id: "applePay", name: "Apple Pay", icon: "creditCard" },
                { id: "googlePay", name: "Google Pay", icon: "creditCard" }
              ].map(pm => (
                <div key={pm.id} style={{ padding: 14, border: "1px solid var(--g2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <I n={pm.icon} s={14} />
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{pm.name}</span>
                  </div>
                  <button className={`toggle-sw toggle-smooth ${paymentMethods[pm.id] ? "on" : ""}`} onClick={() => setPaymentMethods(prev => ({ ...prev, [pm.id]: !prev[pm.id] }))} />
                </div>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
            <h3>Currency</h3>
            <p className="ss-sub">Set the currency for all pricing and payments.</p>
            <select value={paymentCurrency} onChange={e => setPaymentCurrency(e.target.value)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--g2)", fontSize: 13, background: "var(--sf)", color: "var(--tx)", width: 200 }}>
              {["EUR","GBP","USD","CHF","SEK","NOK","DKK","PLN"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Tax/VAT */}
          <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
            <h3>Tax / VAT</h3>
            <p className="ss-sub">Configure tax settings for your pricing.</p>
            <div className="settings-row">
              <div><div className="sr-label">Apply VAT to prices</div></div>
              <button className={`toggle-sw toggle-smooth ${paymentVat.enabled ? "on" : ""}`} onClick={() => setPaymentVat(v => ({ ...v, enabled: !v.enabled }))} />
            </div>
            {paymentVat.enabled && (
              <div style={{ marginTop: 12 }}>
                <div className="field-row">
                  <div className="field">
                    <label>VAT Rate (%)</label>
                    <input type="number" value={paymentVat.rate} onChange={e => setPaymentVat(v => ({ ...v, rate: parseFloat(e.target.value) || 0 }))} />
                  </div>
                  <div className="field">
                    <label>VAT Display</label>
                    <select value={paymentVat.inclusive ? "inclusive" : "exclusive"} onChange={e => setPaymentVat(v => ({ ...v, inclusive: e.target.value === "inclusive" }))} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--g2)", fontSize: 13, background: "var(--sf)", color: "var(--tx)", width: "100%" }}>
                      <option value="inclusive">Included in price</option>
                      <option value="exclusive">Added on top</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Business Details */}
          <div className="settings-section anim-fade-up">
            <h3>Business Details</h3>
            <p className="ss-sub">Information displayed on receipts and invoices.</p>
            <div className="field-row">
              <div className="field"><label>Legal Company Name</label><input type="text" value={businessDetails.legalName} onChange={e => setBusinessDetails(b => ({ ...b, legalName: e.target.value }))} /></div>
              <div className="field"><label>VAT Number</label><input type="text" value={businessDetails.vatNumber} onChange={e => setBusinessDetails(b => ({ ...b, vatNumber: e.target.value }))} /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>Street Address</label><input type="text" value={businessDetails.address} onChange={e => setBusinessDetails(b => ({ ...b, address: e.target.value }))} /></div>
              <div className="field"><label>City</label><input type="text" value={businessDetails.city} onChange={e => setBusinessDetails(b => ({ ...b, city: e.target.value }))} /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>Postal Code</label><input type="text" value={businessDetails.postalCode} onChange={e => setBusinessDetails(b => ({ ...b, postalCode: e.target.value }))} /></div>
              <div className="field"><label>Country</label><input type="text" value={businessDetails.country} onChange={e => setBusinessDetails(b => ({ ...b, country: e.target.value }))} /></div>
              <div className="field"><label>CoC Number</label><input type="text" value={businessDetails.cocNumber} onChange={e => setBusinessDetails(b => ({ ...b, cocNumber: e.target.value }))} /></div>
            </div>
            <div className="field"><label>Billing Email</label><input type="email" value={businessDetails.email} onChange={e => setBusinessDetails(b => ({ ...b, email: e.target.value }))} /></div>
            <button className="btn btn-p btn-press" style={{ marginTop: 16 }} onClick={() => showToastMsg("Business details saved")}>Save Details</button>
          </div>
        </div>
      )}

      {settingsTab === "team" && (
        <div className="settings-section anim-fade-up">
          <h3>Team Members</h3>
          <p className="ss-sub">Manage who has access to your organization.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid var(--g1)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,var(--ac),#4A35E0)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700}}>AD</div>
              <div>
                <div style={{fontSize:13,fontWeight:600}}>{MOCK_ORG.name}</div>
                <div style={{fontSize:11,color:"var(--g4)"}}>{MOCK_ORG.email} &middot; Owner</div>
              </div>
            </div>
            <span style={{fontSize:11,fontWeight:600,color:"var(--ac)"}}>Owner</span>
          </div>
          <button className="btn btn-s btn-sm" style={{marginTop:16}}><I n="plus" s={14} /> Invite Team Member</button>
        </div>
      )}

      {settingsTab === "notifications" && (
        <div className="settings-section anim-fade-up">
          <h3>Notifications</h3>
          <p className="ss-sub">Configure how you receive notifications.</p>
          {[
            {label:"New Applications",sub:"Get notified when someone applies to your program",on:true},
            {label:"Payment Received",sub:"Get notified when a payment is received",on:true},
            {label:"Cancellations",sub:"Get notified when a participant cancels",on:true},
            {label:"Weekly Reports",sub:"Receive a weekly summary of your programs",on:false}
          ].map((item,i) => (
            <div key={i} className="settings-row">
              <div>
                <div className="sr-label">{item.label}</div>
                <div className="sr-sub">{item.sub}</div>
              </div>
              <button className={`toggle-sw toggle-smooth ${item.on?"on":""}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // === RENDER: PROGRAM DETAIL ===
  const renderProgramDetail = () => {
    const prog = viewProgram;
    return (
      <div>
        {programPage === "overview" && renderProgramOverview(prog)}
        {programPage === "applicants" && ["A","D"].includes(prog.model) && renderProgramApplicants(prog)}
        {programPage === "bookings" && prog.model === "B" && renderProgramBookings(prog)}
        {programPage === "participants" && renderProgramParticipants(prog)}
        {programPage === "finances" && renderProgramFinances(prog)}
        {programPage === "schedule" && renderProgramSchedule(prog)}
        {programPage === "communication" && renderProgramCommunication(prog)}
        {programPage === "marketing" && renderProgramMarketing(prog)}
        {programPage === "settings" && renderProgramSettings(prog)}
      </div>
    );
  };

  // === PROGRAM OVERVIEW ===
  const renderProgramOverview = (prog) => {
    const appCount = programApps.length;
    const acceptedCount = programApps.filter(a => a.status === "accepted" || a.status === "scholarship").length;
    const confirmedCount = programParticipants.filter(p => p.status === "confirmed").length;
    const progRevenue = programPayments.filter(p => p.status === "succeeded").reduce((s, p) => s + p.amount, 0) + programTickets.filter(t => t.status === "confirmed").reduce((s, t) => s + t.amount, 0);
    const daysLeft = daysUntil(prog.startDate);

    return (
      <div>
        <div className={`prog-overview-banner ${prog.type}`} style={{
          backgroundImage: prog.coverImage ? `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5)),url(${prog.coverImage})` : undefined,
          background: !prog.coverImage && prog.bannerGradient ? prog.bannerGradient : undefined,
          backgroundSize: prog.coverImage ? "cover" : undefined,
          backgroundPosition: prog.coverImage ? "center" : undefined,
          color: (prog.coverImage || prog.bannerGradient) ? "#fff" : undefined
        }}>
          <h2>{prog.name}</h2>
          <div className="pob-meta" style={{color: (prog.coverImage || prog.bannerGradient) ? "rgba(255,255,255,.8)" : undefined}}>
            <span><I n="calendar" s={14} /> {formatDate(prog.startDate)} - {formatDate(prog.endDate)}</span>
            <span><I n="mapPin" s={14} /> {prog.location}</span>
            <span><I n="users" s={14} /> {prog.capacity ? `${confirmedCount}/${prog.capacity}` : "Unlimited spots"}</span>
            {daysLeft !== null && daysLeft > 0 && <span><I n="clock" s={14} /> {daysLeft} days until start</span>}
          </div>
          {prog.basePrice && <div className="pob-price">{formatCurrency(prog.basePrice, prog.currency)}</div>}
        </div>
        <div className="stat-grid">
          <div className="stat-card"><div className="stat-label">Applications</div><div className="stat-value">{appCount}</div></div>
          <div className="stat-card"><div className="stat-label">Accepted</div><div className="stat-value" style={{color:"var(--green)"}}>{acceptedCount}</div></div>
          <div className="stat-card"><div className="stat-label">Confirmed</div><div className="stat-value" style={{color:"var(--ac)"}}>{confirmedCount}</div></div>
          <div className="stat-card"><div className="stat-label">Revenue</div><div className="stat-value" style={{color:"var(--green)"}}>{formatCurrency(progRevenue, prog.currency)}</div></div>
        </div>
        {prog.model === "A" && (prog.weeks || []).length > 0 && (
          <div className="dash-section" style={{marginBottom:20}}>
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:12}}>Week Fill Rates</h3>
            {(prog.weeks || []).map(wk => {
              const wkParts = programParticipants.filter(p => { const ptApp = applications.find(a => a.name === p.name && a.programId === prog.id); return ptApp?.weekAssignment === wk.id; });
              const wkCap = wk.capacity || prog.capacity || 1;
              const fillPct = Math.round((wkParts.length / wkCap) * 100);
              const spotsLeft = Math.max(0, wkCap - wkParts.length);
              return (
                <div key={wk.id} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                    <span style={{fontWeight:600,color:"var(--tx)"}}>{wk.name}</span>
                    <span style={{color:"var(--g4)"}}>{spotsLeft} spots left</span>
                  </div>
                  <div style={{height:6,borderRadius:3,background:"var(--g1)",overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:3,width:`${Math.min(fillPct,100)}%`,background:fillPct>=90?"var(--red)":fillPct>=70?"var(--amber)":"var(--ac)",transition:"width .3s"}} />
                  </div>
                  <div style={{fontSize:10,color:"var(--g4)",marginTop:2}}>{fillPct}% filled</div>
                </div>
              );
            })}
          </div>
        )}
        {prog.model === "B" && (() => {
          const progBookings = workshopBookings.filter(b => b.programId === prog.id);
          const workshopCounts = {};
          progBookings.forEach(b => { workshopCounts[b.workshopId] = (workshopCounts[b.workshopId] || 0) + 1; });
          const topWsId = Object.keys(workshopCounts).sort((a,b) => workshopCounts[b] - workshopCounts[a])[0];
          const topWs = (prog.workshops || []).find(w => w.id === topWsId);
          const bundleCount = progBookings.filter(b => b.bundleDiscount).length;
          const bundlePct = progBookings.length > 0 ? Math.round((bundleCount / progBookings.length) * 100) : 0;
          return (
            <div className="stat-grid" style={{marginBottom:20}}>
              <div className="stat-card"><div className="stat-label">Workshop Bookings</div><div className="stat-value" style={{color:"var(--ac)"}}>{progBookings.length}</div></div>
              <div className="stat-card"><div className="stat-label">Top Workshop</div><div className="stat-value" style={{fontSize:14,color:"var(--ac)"}}>{topWs?.name || "—"}</div></div>
              <div className="stat-card"><div className="stat-label">Bundle Usage</div><div className="stat-value" style={{color:"var(--ac)"}}>{bundlePct}%</div></div>
            </div>
          );
        })()}
        <div className="dash-grid">
          <div>
            <div className="dash-section">
              <h3>Program Details</h3>
              <p style={{fontSize:14,color:"var(--g5)",lineHeight:1.7,marginBottom:16}}>{prog.description}</p>
              {prog.styles && prog.styles.length > 0 && (
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:600,color:"var(--g6)",marginBottom:6}}>Styles</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{prog.styles.map(s => <span key={s} className="chip on" style={{cursor:"default"}}>{s}</span>)}</div>
                </div>
              )}
              {prog.level && <div style={{marginBottom:8}}><span style={{fontSize:12,fontWeight:600,color:"var(--g6)"}}>Level:</span> <span style={{fontSize:13,color:"var(--g5)"}}>{prog.level}</span></div>}
              {prog.ageRange && <div style={{marginBottom:8}}><span style={{fontSize:12,fontWeight:600,color:"var(--g6)"}}>Age Range:</span> <span style={{fontSize:13,color:"var(--g5)"}}>{prog.ageRange}</span></div>}
              <div style={{marginBottom:8}}><span style={{fontSize:12,fontWeight:600,color:"var(--g6)"}}>Venue:</span> <span style={{fontSize:13,color:"var(--g5)"}}>{prog.venue || prog.location}</span></div>
              <div style={{marginBottom:8}}><span style={{fontSize:12,fontWeight:600,color:"var(--g6)"}}>Dates:</span> <span style={{fontSize:13,color:"var(--g5)"}}>{formatDate(prog.startDate)} - {formatDate(prog.endDate)}</span></div>
              {prog.applicationDeadline && <div style={{marginBottom:8}}><span style={{fontSize:12,fontWeight:600,color:"var(--g6)"}}>Application Deadline:</span> <span style={{fontSize:13,color:"var(--g5)"}}>{formatDate(prog.applicationDeadline)}</span></div>}
            </div>
          </div>
          <div>
            <div className="dash-section">
              <h3><I n="clipboardList" s={16} /> Getting Started</h3>
              {[
                { done: prog.status === "published", label: "Publish your program" },
                { done: appCount > 0, label: "Review incoming applications" },
                { done: confirmedCount > 0, label: "Confirm participants" },
                { done: progRevenue > 0, label: "Collect payments" },
                { done: false, label: "Send welcome message" }
              ].map((step, i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--g1)"}}>
                  <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:step.done?"rgba(29,185,84,.1)":"var(--g1)",color:step.done?"var(--green)":"var(--g4)",flexShrink:0}}>
                    {step.done ? <I n="check" s={12} /> : <span style={{width:8,height:8,borderRadius:"50%",background:"var(--g3)"}} />}
                  </div>
                  <span style={{fontSize:13,color:step.done?"var(--tx)":"var(--g5)",textDecoration:step.done?"line-through":"none"}}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // === PROGRAM APPLICANTS ===
  const appStatusColors = {
    submitted: { bg: "rgba(255,255,255,.1)", text: "#999", label: "New" },
    under_review: { bg: "rgba(96,77,255,.2)", text: "#604dff", label: "Reviewing" },
    accepted: { bg: "rgba(29,185,84,.2)", text: "#1DB954", label: "Accepted" },
    scholarship: { bg: "rgba(245,166,35,.2)", text: "#F5A623", label: "Scholarship" },
    waitlisted: { bg: "rgba(33,150,243,.2)", text: "#2196F3", label: "Waitlisted" },
    rejected: { bg: "rgba(255,71,87,.2)", text: "#FF4757", label: "Not Selected" },
    shortlisted: { bg: "rgba(122,102,255,.2)", text: "#7A66FF", label: "Shortlisted" }
  };

  const filterChipColors = {
    all: null,
    submitted: { bg: "rgba(255,255,255,.08)", activeBg: "rgba(255,255,255,.15)", text: "#999" },
    under_review: { bg: "rgba(96,77,255,.08)", activeBg: "rgba(96,77,255,.2)", text: "#604dff" },
    accepted: { bg: "rgba(29,185,84,.08)", activeBg: "rgba(29,185,84,.2)", text: "#1DB954" },
    scholarship: { bg: "rgba(245,166,35,.08)", activeBg: "rgba(245,166,35,.2)", text: "#F5A623" },
    waitlisted: { bg: "rgba(33,150,243,.08)", activeBg: "rgba(33,150,243,.2)", text: "#2196F3" },
    rejected: { bg: "rgba(255,71,87,.08)", activeBg: "rgba(255,71,87,.2)", text: "#FF4757" },
    shortlisted: { bg: "rgba(122,102,255,.08)", activeBg: "rgba(122,102,255,.2)", text: "#7A66FF" }
  };

  const addAppNote = (appId) => {
    if (!newNote.trim()) return;
    setAppNotes(prev => ({
      ...prev,
      [appId]: [...(prev[appId] || []), { text: newNote.trim(), author: "Admin", date: new Date().toISOString() }]
    }));
    setNewNote("");
  };

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const renderApplicantReviewPanel = (prog) => {
    const app = reviewingApp;
    if (!app) return null;
    const idx = filteredApps.findIndex(a => a.id === app.id);
    const hasPrev = idx > 0;
    const hasNext = idx < filteredApps.length - 1;
    const notes = appNotes[app.id] || [];
    const liveApp = applications.find(a => a.id === app.id) || app;
    const videos = liveApp.media ? liveApp.media.filter(m => m.type === "video") : [];
    const photos = liveApp.media ? liveApp.media.filter(m => m.type === "image" || m.type === "photo") : [];

    return (
      <div className="anim-slide-right">
        {/* Navigation bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <button className="btn-press" onClick={() => setReviewingApp(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "var(--g5)", cursor: "pointer", fontSize: 13, fontFamily: "var(--sans)", padding: "6px 10px", borderRadius: 8, transition: "all .15s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.05)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
            <I n="chevronLeft" s={16} /> Back to Candidates
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "var(--tx)" }}>{app.name}</span>
            <span style={{ fontSize: 12, color: "var(--g4)", marginLeft: 8 }}>#{idx + 1}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--g4)" }}>{idx + 1} of {filteredApps.length}</span>
            <button disabled={!hasPrev} onClick={() => setReviewingApp(filteredApps[idx - 1])} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", color: hasPrev ? "var(--tx)" : "var(--g3)", cursor: hasPrev ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="chevronLeft" s={16} /></button>
            <button disabled={!hasNext} onClick={() => setReviewingApp(filteredApps[idx + 1])} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", color: hasNext ? "var(--tx)" : "var(--g3)", cursor: hasNext ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="chevronRight" s={16} /></button>
          </div>
        </div>

        {/* Three-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 260px", gap: 20, alignItems: "start" }}>
          {/* LEFT COLUMN */}
          <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Headshot - NO number badge */}
            <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", paddingBottom: "133%", background: "#2a2a3e" }}>
              {liveApp.headshot ? (
                <img src={liveApp.headshot} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 300, color: "#666" }}>{getInitials(app.name)}</div>
              )}
            </div>
            {/* Info card - clean label-value rows */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, overflow: "hidden" }}>
              {[
                { label: "Age", value: liveApp.age ? `${liveApp.age} years` : null },
                { label: "Height", value: liveApp.height || null },
                { label: "Nationality", value: liveApp.nationality },
                { label: "Gender", value: liveApp.gender || null },
                { label: "Location", value: liveApp.location },
                { label: "Role", value: liveApp.experienceLevel || (liveApp.danceStyles ? liveApp.danceStyles.join(", ") : null) },
                { label: "Email", value: liveApp.email },
              ].filter(item => item.value).map((item, i, arr) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
                  <span style={{ fontSize: 12, color: "var(--g4)" }}>{item.label}</span>
                  <span style={{ fontSize: 13, color: "var(--tx)", fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
            {/* Availability card */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--g4)", textTransform: "uppercase", letterSpacing: ".03em" }}>Applied</div>
                  <div style={{ fontSize: 13, color: "var(--tx)", marginTop: 4 }}>{formatDate(liveApp.submittedAt)}</div>
                </div>
              </div>
            </div>
            {/* Rating */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 10, color: "var(--g4)", textTransform: "uppercase", letterSpacing: ".03em", marginBottom: 8 }}>Rating</div>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(r => (
                  <span key={r} onClick={() => {
                    setApplications(prev => prev.map(a => a.id === app.id ? { ...a, rating: r } : a));
                    setReviewingApp(prev => prev ? { ...prev, rating: r } : null);
                  }} style={{ fontSize: 22, color: r <= (liveApp.rating || 0) ? "#F5A623" : "var(--g3)", cursor: "pointer", transition: "transform .1s" }} onMouseEnter={e => e.target.style.transform = "scale(1.2)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}>{"\u2605"}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - Submitted materials */}
          <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Motivation - always visible, no accordion */}
            {liveApp.motivation && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Motivation</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--g5)" }}>{liveApp.motivation}</div>
              </div>
            )}
            {/* Experience */}
            {liveApp.experience && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Dance Experience</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "var(--g5)" }}>{liveApp.experience}</div>
              </div>
            )}
            {/* Videos - tab buttons + player area */}
            {videos.length > 0 && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Videos</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                  {videos.map((m, vi) => (
                    <button key={vi} className="chip-hover" style={{ padding: "6px 14px", borderRadius: 20, border: "none", background: vi === 0 ? "rgba(96,77,255,.15)" : "rgba(255,255,255,.05)", color: vi === 0 ? "var(--ac)" : "var(--g5)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "var(--sans)" }}>{m.name || `Video ${vi + 1}`}</button>
                  ))}
                </div>
                <div style={{ borderRadius: 10, background: "#1a1a2e", height: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(96,77,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontSize: 22 }}>{"\u25B6"}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{videos[0]?.name || "Video"}</div>
                    {videos[0]?.size && <div style={{ fontSize: 10, color: "var(--g4)", marginTop: 2 }}>{videos[0].size}</div>}
                  </div>
                </div>
              </div>
            )}
            {/* Photos - simple grid gallery */}
            {photos.length > 0 && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Photos</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
                  {photos.map((m, pi) => (
                    <div key={pi} style={{ borderRadius: 8, background: "#2a2a3e", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.3)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                      <I n="image" s={24} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Other files */}
            {liveApp.media && liveApp.media.filter(m => m.type !== "video" && m.type !== "image" && m.type !== "photo").length > 0 && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Files</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {liveApp.media.filter(m => m.type !== "video" && m.type !== "image" && m.type !== "photo").map((m, fi) => (
                    <div key={fi} style={{ borderRadius: 8, background: "rgba(255,255,255,.03)", padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                      <I n="fileText" s={16} />
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{m.name}</div>
                      <div style={{ fontSize: 10, color: "var(--g4)", marginLeft: "auto" }}>{m.size}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* No materials fallback */}
            {!liveApp.motivation && !liveApp.experience && (!liveApp.media || liveApp.media.length === 0) && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 40, textAlign: "center" }}>
                <I n="fileText" s={32} />
                <p style={{ fontSize: 13, color: "var(--g4)", marginTop: 12 }}>No application materials submitted.</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="anim-fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Status - full-width rows with colored dots */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Status</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { status: "accepted", color: "#1DB954", label: "Selected" },
                  { status: "shortlisted", color: "#7A66FF", label: "Shortlisted" },
                  { status: "waitlisted", color: "#F5A623", label: "Potential / Waitlist" },
                  { status: "rejected", color: "#FF4757", label: "Not Selected" },
                ].map(opt => (
                  <button key={opt.status} className="btn-press" onClick={() => {
                    updateAppStatus(app.id, opt.status);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8,
                    border: "none", width: "100%",
                    background: (opt.status === "accepted" && (liveApp.status === "accepted" || liveApp.status === "scholarship")) ? `${opt.color}18` : liveApp.status === opt.status ? `${opt.color}18` : "transparent",
                    cursor: "pointer", transition: "all .15s", fontFamily: "var(--sans)", color: "var(--tx)",
                    fontWeight: (opt.status === "accepted" && (liveApp.status === "accepted" || liveApp.status === "scholarship")) ? 600 : liveApp.status === opt.status ? 600 : 400
                  }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: opt.color, opacity: (opt.status === "accepted" && (liveApp.status === "accepted" || liveApp.status === "scholarship")) ? 1 : liveApp.status === opt.status ? 1 : 0.4, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, flex: 1, textAlign: "left" }}>{opt.label}</span>
                    {(opt.status === "accepted" && (liveApp.status === "accepted" || liveApp.status === "scholarship")) && <I n="check" s={14} />}
                    {opt.status !== "accepted" && liveApp.status === opt.status && <I n="check" s={14} />}
                  </button>
                ))}
              </div>
              {/* Scholarship dropdown under Selected */}
              {(liveApp.status === "accepted" || liveApp.status === "scholarship") ? (
                <div style={{ padding: "8px 12px", background: "rgba(29,185,84,.05)", borderRadius: 8, marginTop: 4 }}>
                  <div style={{ fontSize: 11, color: "#888", marginBottom: 6 }}>Scholarship (optional)</div>
                  <select
                    value={liveApp.scholarshipTierId || ""}
                    onChange={e => {
                      const tierId = e.target.value;
                      if (tierId) {
                        updateAppStatus(liveApp.id, "scholarship", tierId);
                      } else {
                        updateAppStatus(liveApp.id, "accepted");
                      }
                    }}
                    style={{ width: "100%", background: "var(--sf)", border: "1px solid var(--g2)", borderRadius: 8, padding: "8px 10px", color: "var(--tx)", fontSize: 13 }}
                  >
                    <option value="">No scholarship</option>
                    {(prog.scholarshipTiers || []).map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.discount}% off)</option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>

            {/* Labels section */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 10 }}>Labels</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {(liveApp.labels || []).map((lb, li) => (
                  <span key={li} className="chip-hover" style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(96,77,255,.1)", color: "var(--ac)", fontSize: 11, fontWeight: 500 }}>{lb}</span>
                ))}
                <button style={{ padding: "4px 10px", borderRadius: 20, border: "1px dashed rgba(255,255,255,.15)", background: "none", color: "var(--g4)", fontSize: 11, cursor: "pointer" }}>+ Add</button>
              </div>
            </div>

            {/* Week assignment for Model A */}
            {prog?.model === "A" && (prog.weeks || []).length > 0 && (liveApp.status === "accepted" || liveApp.status === "scholarship") && (
              <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--g4)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>Week Assignment</div>
                <select value={liveApp.weekAssignment || ""} onChange={e => {
                  const wId = e.target.value;
                  setApplications(prev => prev.map(a => a.id === app.id ? { ...a, weekAssignment: wId || null } : a));
                  setReviewingApp(prev => prev ? { ...prev, weekAssignment: wId || null } : null);
                  showToastMsg(wId ? "Week assigned" : "Week unassigned");
                }} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", color: "var(--tx)", fontSize: 13, fontFamily: "var(--sans)" }}>
                  <option value="">Unassigned</option>
                  {(prog.weeks || []).map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({(w.capacity - (w.spotsLeft ?? w.capacity))}/{w.capacity})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Notes Section */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Notes</div>
              <div style={{ maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: notes.length > 0 ? 12 : 0 }}>
                {notes.map((note, ni) => (
                  <div key={ni} style={{ background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "10px 12px" }}>
                    <div style={{ fontSize: 12, color: "var(--tx)", lineHeight: 1.5 }}>{note.text}</div>
                    <div style={{ fontSize: 10, color: "var(--g4)", marginTop: 4 }}>{note.author} {"\u00B7"} {formatDate(note.date)}</div>
                  </div>
                ))}
              </div>
              {liveApp.notes && notes.length === 0 && (
                <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: "var(--tx)", lineHeight: 1.5 }}>{liveApp.notes}</div>
                  <div style={{ fontSize: 10, color: "var(--g4)", marginTop: 4 }}>Existing note</div>
                </div>
              )}
              <div style={{ display: "flex", gap: 6 }}>
                <input value={newNote} onChange={e => setNewNote(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addAppNote(app.id); }} placeholder="Add a note..." style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", color: "var(--tx)", fontSize: 12, fontFamily: "var(--sans)" }} />
                <button className="btn-press" onClick={() => addAppNote(app.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: newNote.trim() ? "var(--ac)" : "rgba(255,255,255,.05)", color: newNote.trim() ? "#fff" : "var(--g4)", cursor: newNote.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="send" s={14} /></button>
              </div>
            </div>

            {/* Review History - timeline */}
            <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)", marginBottom: 12 }}>Review History</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", paddingLeft: 16 }}>
                {/* Timeline line */}
                <div style={{ position: "absolute", left: 3, top: 4, bottom: 4, width: 1, background: "rgba(255,255,255,.06)" }} />
                {liveApp.reviewedAt && (
                  <div style={{ display: "flex", gap: 12, paddingBottom: 12, position: "relative" }}>
                    <div style={{ position: "absolute", left: -13, top: 4, width: 8, height: 8, borderRadius: "50%", background: appStatusColors[liveApp.status]?.text || "#999" }} />
                    <div>
                      <div style={{ fontSize: 12, color: "var(--tx)" }}>Changed to {appStatusColors[liveApp.status]?.label || liveApp.status}</div>
                      <div style={{ fontSize: 10, color: "var(--g4)" }}>{formatDate(liveApp.reviewedAt)}</div>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", gap: 12, position: "relative" }}>
                  <div style={{ position: "absolute", left: -13, top: 4, width: 8, height: 8, borderRadius: "50%", background: "var(--g3)" }} />
                  <div>
                    <div style={{ fontSize: 12, color: "var(--tx)" }}>Application submitted</div>
                    <div style={{ fontSize: 10, color: "var(--g4)" }}>{formatDate(liveApp.submittedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgramApplicants = (prog) => {
    // If reviewing a specific applicant, show the review panel
    if (reviewingApp) {
      return renderApplicantReviewPanel(prog);
    }

    return (
      <div>
        {/* Floating Toolbar */}
        <div style={{ position: "sticky", top: 12, zIndex: 40, background: "var(--sf, #1a1a2e)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(20px)", marginBottom: 20, transition: "box-shadow .2s", flexWrap: "wrap" }}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "1 1 auto", maxWidth: 280, background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "6px 12px" }}>
            <I n="search" s={14} />
            <input placeholder="Search applicants..." value={appSearch} onChange={e => setAppSearch(e.target.value)} style={{ border: "none", background: "none", outline: "none", color: "var(--tx)", fontSize: 13, fontFamily: "var(--sans)", width: "100%" }} />
          </div>
          {/* Status filter chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: "1 1 auto" }}>
            {[
              { key: "all", label: "All", count: programApps.length },
              { key: "submitted", label: "New", count: programApps.filter(a => a.status === "submitted").length },
              { key: "under_review", label: "Reviewing", count: programApps.filter(a => a.status === "under_review").length },
              { key: "accepted", label: "Accepted", count: programApps.filter(a => a.status === "accepted").length },
              { key: "scholarship", label: "Scholarship", count: programApps.filter(a => a.status === "scholarship").length },
              { key: "waitlisted", label: "Waitlisted", count: programApps.filter(a => a.status === "waitlisted").length },
              { key: "rejected", label: "Rejected", count: programApps.filter(a => a.status === "rejected").length },
            ].map(f => {
              const isActive = appFilter === f.key;
              const chipColor = filterChipColors[f.key];
              return (
                <button key={f.key} className="chip-hover" onClick={() => setAppFilter(f.key)} style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 20,
                  border: "none", cursor: "pointer", fontSize: 12, fontWeight: isActive ? 600 : 400,
                  fontFamily: "var(--sans)", transition: "all .15s",
                  background: isActive ? (chipColor?.activeBg || "rgba(255,255,255,.12)") : "rgba(255,255,255,.04)",
                  color: isActive ? (chipColor?.text || "var(--tx)") : "var(--g4)"
                }}>
                  {f.label}
                  <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400 }}>{f.count}</span>
                </button>
              );
            })}
          </div>
          {/* View toggle */}
          <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: 2 }}>
            <button onClick={() => setAppViewMode("grid")} style={{ width: 32, height: 28, borderRadius: 6, border: "none", background: appViewMode === "grid" ? "rgba(255,255,255,.1)" : "transparent", color: appViewMode === "grid" ? "var(--tx)" : "var(--g4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="grid" s={14} /></button>
            <button onClick={() => setAppViewMode("list")} style={{ width: 32, height: 28, borderRadius: 6, border: "none", background: appViewMode === "list" ? "rgba(255,255,255,.1)" : "transparent", color: appViewMode === "list" ? "var(--tx)" : "var(--g4)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="list" s={14} /></button>
          </div>
          {/* Filters toggle */}
          <button onClick={() => setShowAdvFilters(!showAdvFilters)} style={{ background: showAdvFilters ? "#604dff" : "transparent", color: showAdvFilters ? "#fff" : "#999", border: "1px solid rgba(255,255,255,.1)", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--sans)" }}>
            <I n="filter" s={14} /> Filters
            {activeFilterCount > 0 && <span style={{ background: "#FF4757", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 10 }}>{activeFilterCount}</span>}
          </button>
          {/* Sort dropdown */}
          <select value={appSort} onChange={e => setAppSort(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", color: "var(--tx)", fontSize: 12, fontFamily: "var(--sans)", cursor: "pointer", marginLeft: "auto" }}>
            <option value="newest">Newest</option>
            <option value="name">Name A-Z</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Advanced filters row */}
        {showAdvFilters && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end", padding: "12px 16px", background: "rgba(255,255,255,.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>AGE</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <input type="number" placeholder="Min" value={advFilters.ageMin} onChange={e => setAdvFilters(f => ({ ...f, ageMin: e.target.value }))} style={{ width: 60, background: "#0d0d12", border: "1px solid #333", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 12 }} />
                <span style={{ color: "#666" }}>—</span>
                <input type="number" placeholder="Max" value={advFilters.ageMax} onChange={e => setAdvFilters(f => ({ ...f, ageMax: e.target.value }))} style={{ width: 60, background: "#0d0d12", border: "1px solid #333", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 12 }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>NATIONALITY</div>
              <input placeholder="e.g. British" value={advFilters.nationality} onChange={e => setAdvFilters(f => ({ ...f, nationality: e.target.value }))} style={{ width: 100, background: "#0d0d12", border: "1px solid #333", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 12 }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>LOCATION</div>
              <input placeholder="e.g. London" value={advFilters.location} onChange={e => setAdvFilters(f => ({ ...f, location: e.target.value }))} style={{ width: 100, background: "#0d0d12", border: "1px solid #333", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 12 }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>LEVEL</div>
              <select value={advFilters.level} onChange={e => setAdvFilters(f => ({ ...f, level: e.target.value }))} style={{ background: "#0d0d12", border: "1px solid #333", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 12 }}>
                <option value="">All</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>STYLES</div>
              <input placeholder="e.g. Contemporary" value={advFilters.styles} onChange={e => setAdvFilters(f => ({ ...f, styles: e.target.value }))} style={{ width: 120, background: "#0d0d12", border: "1px solid #333", borderRadius: 6, padding: "6px 8px", color: "#fff", fontSize: 12 }} />
            </div>
            <button onClick={() => setAdvFilters({ ageMin: "", ageMax: "", nationality: "", location: "", level: "", styles: "" })} style={{ background: "none", border: "none", color: "#FF4757", fontSize: 12, cursor: "pointer", padding: "6px 0", fontFamily: "var(--sans)" }}>Clear Filters</button>
          </div>
        )}

        {/* Batch actions bar */}
        {selectedApps.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "rgba(96,77,255,.06)", border: "1px solid rgba(96,77,255,.15)", borderRadius: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{selectedApps.length} selected</span>
            <button className="btn btn-success btn-sm" onClick={() => batchUpdateStatus("accepted")}>Accept All</button>
            <button className="btn btn-danger btn-sm" onClick={() => batchUpdateStatus("rejected")}>Reject All</button>
            <button className="btn btn-g btn-sm" onClick={() => setSelectedApps([])}>Clear</button>
          </div>
        )}

        {/* Empty state */}
        {filteredApps.length === 0 ? (
          <div className="empty-state"><div className="es-icon"><I n="users" s={48} /></div><p>No applicants match your filters.</p></div>
        ) : appViewMode === "grid" ? (
          /* Grid View */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {filteredApps.map((app, i) => (
              <div key={app.id} className="app-card-enter card-hover" onClick={(e) => { if (e.shiftKey) { toggleSelectApp(app.id); } else { setReviewingApp(app); } }} style={{
                borderRadius: 12, overflow: "hidden", cursor: "pointer",
                border: selectedApps.includes(app.id) ? "2px solid var(--ac)" : "1px solid rgba(255,255,255,.06)",
                transition: "all .2s", position: "relative",
                animationDelay: `${i * 0.03}s`
              }}>
                {/* Image area - 3:4 aspect ratio */}
                <div style={{ paddingBottom: "133%", position: "relative", background: "#2a2a3e" }}>
                  {app.headshot ? (
                    <img src={app.headshot} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 300, color: "#666" }}>{app.name.charAt(0)}</div>
                  )}
                  {/* Number badge top-left */}
                  <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", padding: "3px 8px", borderRadius: 6, fontSize: 11, color: "#999" }}>#{i + 1}</div>
                  {/* Checkbox next to number */}
                  <div style={{ position: "absolute", top: 8, left: 50, zIndex: 2 }} onClick={e => { e.stopPropagation(); toggleSelectApp(app.id); }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, border: "2px solid rgba(255,255,255,.6)", background: selectedApps.includes(app.id) ? "var(--ac)" : "rgba(0,0,0,.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      {selectedApps.includes(app.id) && <I n="check" s={12} />}
                    </div>
                  </div>
                  {/* Status badge top-right */}
                  <div style={{ position: "absolute", top: 8, right: 8, background: appStatusColors[app.status]?.bg || "rgba(255,255,255,.1)", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, color: appStatusColors[app.status]?.text || "#999", letterSpacing: 0.5, textTransform: "uppercase" }}>{appStatusColors[app.status]?.label || statusLabel(app.status)}</div>
                  {/* Bottom gradient + name */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,.8))", padding: "24px 12px 10px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{app.name}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{app.nationality}{app.age ? ` \u00B7 ${app.age}` : ""}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View (Table) */
          <div style={{ background: "var(--sf)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "40px 40px 1fr 70px 100px 80px 100px 90px", gap: 8, padding: "10px 16px", fontSize: 10, fontWeight: 600, color: "var(--g4)", textTransform: "uppercase", letterSpacing: ".05em", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              <span>#</span><span></span><span>Name</span><span>Age</span><span>Nationality</span><span>Rating</span><span>Status</span><span>Date</span>
            </div>
            {/* Table rows */}
            {filteredApps.map((app, i) => (
              <div key={app.id} onClick={() => setReviewingApp(app)} style={{ display: "grid", gridTemplateColumns: "40px 40px 1fr 70px 100px 80px 100px 90px", gap: 8, padding: "10px 16px", alignItems: "center", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,.03)", transition: "background .15s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.03)"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                <span style={{ fontSize: 11, color: "var(--g4)" }}>{i + 1}</span>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2a2a3e", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: "#666", flexShrink: 0 }}>
                  {app.headshot ? <img src={app.headshot} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : app.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--tx)" }}>{app.name}</div>
                  <div style={{ fontSize: 11, color: "var(--g4)" }}>{app.email}</div>
                </div>
                <span style={{ fontSize: 12, color: "var(--g5)" }}>{app.age || "-"}</span>
                <span style={{ fontSize: 12, color: "var(--g5)" }}>{app.nationality || "-"}</span>
                <div style={{ display: "flex", gap: 1 }}>
                  {[1,2,3,4,5].map(r => (
                    <span key={r} style={{ fontSize: 12, color: r <= (app.rating || 0) ? "#F5A623" : "var(--g3)" }}>★</span>
                  ))}
                </div>
                <div style={{ display: "inline-flex" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: appStatusColors[app.status]?.bg, color: appStatusColors[app.status]?.text, textTransform: "uppercase", letterSpacing: 0.5 }}>{appStatusColors[app.status]?.label || statusLabel(app.status)}</span>
                </div>
                <span style={{ fontSize: 11, color: "var(--g4)" }}>{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "-"}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // === PROGRAM PARTICIPANTS ===
  const renderProgramParticipants = (prog) => {
    const hasPendingPayments = programParticipants.some(pt => pt.paymentStatus === "pending" || pt.paymentStatus === "partial");
    return (
      <div>
        <div className="pg-header" style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
          <div><h1 style={{fontSize:20}}>Participants</h1><p>{programParticipants.length} participant{programParticipants.length !== 1 ? "s" : ""}</p></div>
          {hasPendingPayments && <button className="btn btn-s" onClick={()=>setToast("Reminders sent to all participants with pending payments")}><I n="send" s={14} /> Send Bulk Reminder</button>}
        </div>
        {programParticipants.length === 0 ? (
          <div className="empty-state"><div className="es-icon"><I n="userCheck" s={48} /></div><p>No confirmed participants yet.</p></div>
        ) : (
          <div>
            {prog.model === "A" && (prog.weeks || []).length > 0 && (
              <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
                <button className={`chip ${weekFilter==="all"?"on":""}`} onClick={()=>setWeekFilter("all")}>All Weeks</button>
                {(prog.weeks || []).map(w => (
                  <button key={w.id} className={`chip ${weekFilter===w.id?"on":""}`} onClick={()=>setWeekFilter(w.id)}>{w.name}</button>
                ))}
              </div>
            )}
            <div style={{display:"grid",gridTemplateColumns:(prog.model === "A" && (prog.weeks || []).length > 0) ? "1fr 100px 100px 100px 140px 100px 180px" : "1fr 100px 100px 140px 100px 180px",gap:8,padding:"8px 20px",fontSize:11,fontWeight:600,color:"var(--g4)",textTransform:"uppercase",letterSpacing:".05em"}}>
              <span style={{textAlign:"left"}}>Participant</span>{prog.model === "A" && (prog.weeks || []).length > 0 && <span>Week</span>}<span style={{textAlign:"center"}}>Status</span><span style={{textAlign:"center"}}>Payment</span><span style={{textAlign:"center"}}>Scholarship</span><span style={{textAlign:"right"}}>Total</span><span style={{textAlign:"right"}}>Actions</span>
            </div>
            {programParticipants.filter(pt => {
              if (!(prog.model === "A" && (prog.weeks || []).length > 0) || weekFilter === "all") return true;
              const ptApp = applications.find(a => a.name === pt.name && a.programId === prog.id);
              return ptApp?.weekAssignment === weekFilter;
            }).map(pt => {
              const isExpanded = expandedParticipant === pt.id;
              return (
                <div key={pt.id} className="part-card">
                  <div className="part-row" style={(prog.model === "A" && (prog.weeks || []).length > 0) ? {gridTemplateColumns:"1fr 100px 100px 100px 140px 100px 180px"} : undefined} onClick={()=>setExpandedParticipant(isExpanded ? null : pt.id)}>
                    <div className="part-info">
                      <div className="roster-avatar">{(() => { const ptApp = applications.find(a => a.name === pt.name); return ptApp?.headshot ? <img src={ptApp.headshot} alt="" style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} /> : getInitials(pt.name); })()}</div>
                      <div>
                        <div style={{fontWeight:600}}>{pt.name}</div>
                        <div style={{fontSize:11,color:"var(--g4)"}}>{pt.email}</div>
                      </div>
                    </div>
                    {prog.model === "A" && (prog.weeks || []).length > 0 && (() => { const ptApp = applications.find(a => a.name === pt.name && a.programId === prog.id); const wk = (prog.weeks || []).find(w => w.id === ptApp?.weekAssignment); return <span style={{fontSize:12,color:wk?"var(--tx)":"var(--g4)"}}>{wk?.name || "Unassigned"}</span>; })()}
                    <span style={{fontSize:12,fontWeight:600,textTransform:"uppercase",textAlign:"center",color:pt.status==="confirmed"?"var(--green)":"var(--amber)"}}>{pt.status}</span>
                    <span style={{fontSize:12,fontWeight:600,textTransform:"uppercase",textAlign:"center",color:pt.paymentStatus==="paid"?"var(--green)":pt.paymentStatus==="partial"?"var(--amber)":"var(--g4)"}}>{pt.paymentStatus?.toUpperCase()}</span>
                    <span style={{fontSize:12,color:pt.scholarshipTier?"var(--amber)":"var(--g4)",textAlign:"center"}}>{pt.scholarshipTier || ""}</span>
                    <span style={{fontSize:13,fontFamily:"var(--mono)",fontWeight:600,textAlign:"right"}}>{formatCurrency(pt.totalAmount, viewProgram.currency)}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "flex-end" }}>
                      {pt.paymentStatus === "pending" && (
                        <button onClick={e=>{e.stopPropagation();setToast(`Payment link sent to ${pt.name}`)}} style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--ac)", color: "#fff", border: "none", padding: "5px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                          Send Payment
                        </button>
                      )}
                      {pt.paymentStatus === "partial" && (
                        <button onClick={e=>{e.stopPropagation();setToast(`Payment reminder sent to ${pt.name}`)}} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "1px solid var(--g2)", color: "var(--tx)", padding: "5px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>
                          <I n="send" s={11} /> Remind
                        </button>
                      )}
                      <button onClick={e=>{e.stopPropagation();setExpandedParticipant(isExpanded?null:pt.id)}} style={{ background: "none", border: "none", color: "var(--g4)", cursor: "pointer", fontSize: 14, padding: "4px 8px", transition: "transform .2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                        <I n="chevronDown" s={16} />
                      </button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div style={{ padding: "20px 20px 16px", borderTop: "1px solid var(--g2)" }}>
                      {/* Top row: Contact + Quick Actions */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div>
                          <div style={{ fontSize: 11, color: "var(--g4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Contact Information</div>
                          <div style={{ fontSize: 13, color: "var(--tx)", marginBottom: 2 }}>{pt.email}</div>
                          {pt.phone && <div style={{ fontSize: 13, color: "var(--g5)" }}>{pt.phone}</div>}
                          {pt.nationality && <div style={{ fontSize: 13, color: "var(--g5)", marginTop: 2 }}>{pt.nationality}{pt.age ? `, ${pt.age} years` : ""}</div>}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setToast(`Message sent to ${pt.name}`)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "1px solid var(--g2)", color: "var(--tx)", padding: "6px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                            <I n="mail" s={13} /> Message
                          </button>
                          <button onClick={() => setToast(`Export for ${pt.name}`)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "1px solid var(--g2)", color: "var(--tx)", padding: "6px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                            <I n="download" s={13} /> Export
                          </button>
                        </div>
                      </div>

                      {/* Three sections side by side */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>

                        {/* Section 1: Payment History */}
                        <div style={{ background: "var(--g1)", borderRadius: 12, padding: 16, border: "1px solid var(--g2)" }}>
                          <div style={{ fontSize: 11, color: "var(--g4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Payment History</span>
                            <span style={{ fontSize: 12, color: pt.paymentStatus === "paid" ? "#1DB954" : "#F5A623", fontWeight: 600, letterSpacing: 0, textTransform: "none" }}>
                              {pt.paymentStatus === "paid" ? "✓ Fully Paid" : pt.paymentStatus === "partial" ? "Partially Paid" : "Awaiting Payment"}
                            </span>
                          </div>
                          {prog.paymentMode === "installments" && prog.installments ? (
                            <div>
                              {prog.installments.map((inst, i) => {
                                const isPaid = i === 0 ? (pt.paymentStatus === "paid" || pt.paymentStatus === "partial") : pt.paymentStatus === "paid";
                                return (
                                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < prog.installments.length - 1 ? "1px solid var(--g2)" : "none" }}>
                                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: isPaid ? "rgba(29,185,84,.15)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>
                                      {isPaid ? <span style={{ color: "#1DB954" }}>✓</span> : <span style={{ color: "var(--g4)" }}>{i + 1}</span>}
                                    </div>
                                    <div style={{ flex: 1, fontSize: 13, color: isPaid ? "var(--tx)" : "var(--g4)" }}>{inst.dueLabel}</div>
                                    <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: isPaid ? "var(--tx)" : "var(--g4)" }}>{formatCurrency(inst.amount, prog.currency)}</div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                              <div style={{ width: 20, height: 20, borderRadius: "50%", background: pt.paymentStatus === "paid" ? "rgba(29,185,84,.15)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                                {pt.paymentStatus === "paid" ? <span style={{ color: "#1DB954" }}>✓</span> : <span style={{ color: "var(--g4)" }}>1</span>}
                              </div>
                              <div style={{ flex: 1, fontSize: 13, color: "var(--tx)" }}>Full Payment</div>
                              <div style={{ fontSize: 13, fontFamily: "var(--mono)", color: "var(--tx)" }}>{formatCurrency(pt.totalPaid || pt.amount || prog.basePrice, prog.currency)}</div>
                            </div>
                          )}
                          {/* Total */}
                          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--g2)", display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                            <span style={{ fontSize: 13, color: "var(--tx)" }}>Total</span>
                            <span style={{ fontSize: 14, fontFamily: "var(--mono)", color: "var(--tx)" }}>{formatCurrency(pt.totalPaid || pt.amount || prog.basePrice, prog.currency)}</span>
                          </div>
                        </div>

                        {/* Section 2: Timeline */}
                        <div style={{ background: "var(--g1)", borderRadius: 12, padding: 16, border: "1px solid var(--g2)" }}>
                          <div style={{ fontSize: 11, color: "var(--g4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Timeline</div>
                          <div style={{ position: "relative", paddingLeft: 20 }}>
                            {/* Timeline line */}
                            <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--g2)" }} />
                            {/* Events */}
                            {[
                              { label: "Application submitted", date: pt.appliedAt || "2026-03-01", color: "var(--g4)" },
                              { label: "Accepted", date: pt.acceptedAt || "2026-03-15", color: "#1DB954" },
                              ...(pt.scholarshipTierId ? [{ label: `Scholarship awarded: ${prog.scholarshipTiers?.find(s => s.id === pt.scholarshipTierId)?.name || ""}`, date: pt.acceptedAt || "2026-03-15", color: "#F5A623" }] : []),
                              { label: pt.paymentStatus === "paid" ? "Payment completed" : pt.paymentStatus === "partial" ? "Partial payment received" : "Awaiting payment", date: pt.paidAt || pt.confirmedAt || "2026-03-20", color: pt.paymentStatus === "paid" ? "#1DB954" : "#F5A623" },
                              { label: "Confirmed as participant", date: pt.confirmedAt || pt.joinedAt || "2026-03-20", color: "#604dff" }
                            ].map((evt, i) => (
                              <div key={i} style={{ position: "relative", marginBottom: 14 }}>
                                <div style={{ position: "absolute", left: -17, top: 4, width: 8, height: 8, borderRadius: "50%", background: evt.color, border: "2px solid var(--g1)" }} />
                                <div style={{ fontSize: 13, color: "var(--tx)", marginBottom: 2 }}>{evt.label}</div>
                                <div style={{ fontSize: 11, color: "var(--g4)" }}>{formatDate(evt.date)}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 3: Details & Notes */}
                        <div style={{ background: "var(--g1)", borderRadius: 12, padding: 16, border: "1px solid var(--g2)" }}>
                          <div style={{ fontSize: 11, color: "var(--g4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Details</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {pt.group && (
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--g5)" }}>Group</span>
                                <span style={{ color: "var(--tx)", fontWeight: 500 }}>{pt.group}</span>
                              </div>
                            )}
                            {pt.weekId && (
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--g5)" }}>Week</span>
                                <span style={{ color: "var(--tx)", fontWeight: 500 }}>{(prog.weeks || []).find(w => w.id === pt.weekId)?.name || pt.weekId}</span>
                              </div>
                            )}
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                              <span style={{ color: "var(--g5)" }}>Joined</span>
                              <span style={{ color: "var(--tx)" }}>{formatDate(pt.confirmedAt || pt.joinedAt || "2026-03-20")}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                              <span style={{ color: "var(--g5)" }}>Application</span>
                              <span style={{ color: "var(--tx)" }}>{formatDate(pt.appliedAt || "2026-03-01")}</span>
                            </div>
                            {pt.scholarshipTierId && (
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                <span style={{ color: "var(--g5)" }}>Scholarship</span>
                                <span style={{ color: "#F5A623", fontWeight: 500 }}>{prog.scholarshipTiers?.find(s => s.id === pt.scholarshipTierId)?.name || ""}</span>
                              </div>
                            )}
                          </div>
                          {/* Notes */}
                          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--g2)" }}>
                            <div style={{ fontSize: 11, color: "var(--g4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Notes</div>
                            <div style={{ fontSize: 13, color: "var(--g5)", fontStyle: "italic", marginBottom: 8 }}>{pt.notes || "No notes yet."}</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <input placeholder="Add a note..." style={{ flex: 1, background: "var(--sf)", border: "1px solid var(--g2)", borderRadius: 8, padding: "8px 12px", color: "var(--tx)", fontSize: 12 }} />
                              <button style={{ background: "var(--ac)", color: "#fff", border: "none", width: 32, height: 32, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <I n="send" s={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // === PROGRAM FINANCES ===
  const renderProgramFinances = (prog) => {
    const progRevenue = programPayments.filter(p => p.status === "succeeded").reduce((s, p) => s + p.amount, 0) + programTickets.filter(t => t.status === "confirmed").reduce((s, t) => s + t.amount, 0);
    const progPending = programPayments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
    const progFees = programPayments.filter(p => p.status === "succeeded").reduce((s, p) => s + (p.platformFee || 0), 0);

    return (
      <div>
        <div className="pg-header"><h1 style={{fontSize:20}}>Finances</h1><p>Revenue and payment tracking for {prog.name}</p></div>
        <div className="fin-overview">
          <div className="fin-card collected">
            <div className="fin-amount">{formatCurrency(progRevenue, prog.currency)}</div>
            <div className="fin-label">Total Revenue</div>
          </div>
          <div className="fin-card pending">
            <div className="fin-amount">{formatCurrency(progPending, prog.currency)}</div>
            <div className="fin-label">Pending</div>
          </div>
          <div className="fin-card">
            <div className="fin-amount" style={{color:"var(--g5)"}}>{formatCurrency(progFees, prog.currency)}</div>
            <div className="fin-label">Platform Fees</div>
          </div>
        </div>

        {["A","D"].includes(prog.model) && (
          <div className="dash-section" style={{marginBottom:24}}>
            <h3><I n="creditCard" s={16} /> Payments</h3>
            {programPayments.length === 0 ? (
              <div className="empty-state" style={{padding:32}}><p>No payments recorded yet.</p></div>
            ) : (
              <div style={{overflowX:"auto"}}>
                <table className="pay-table">
                  <thead><tr><th>Participant</th><th>Amount</th><th>Fee</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>
                  <tbody>
                    {programPayments.map(pay => {
                      const part = participants.find(p => p.id === pay.participantId);
                      return (
                        <tr key={pay.id}>
                          <td style={{fontWeight:500}}>{part?.name || "Unknown"}</td>
                          <td style={{fontFamily:"var(--mono)",fontWeight:600}}>{formatCurrency(pay.amount, prog.currency)}</td>
                          <td style={{fontFamily:"var(--mono)",fontSize:12,color:"var(--g4)"}}>{formatCurrency(pay.platformFee || 0, prog.currency)}</td>
                          <td style={{fontSize:12,color:"var(--g5)"}}>{pay.type?.replace(/_/g, " ") || "-"}</td>
                          <td><span className={`pay-status ${pay.status}`}>{pay.status}</span></td>
                          <td style={{fontSize:12,color:"var(--g4)"}}>{formatDate(pay.paidAt || pay.dueDate)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {prog.model === "C" && (
          <div className="dash-section" style={{marginBottom:24}}>
            <h3><I n="ticket" s={16} /> Ticket Sales</h3>
            {programTickets.length === 0 ? (
              <div className="empty-state" style={{padding:32}}><p>No tickets sold yet.</p></div>
            ) : (
              <div style={{overflowX:"auto"}}>
                <table className="pay-table">
                  <thead><tr><th>Buyer</th><th>Qty</th><th>Amount</th><th>Status</th><th>Code</th><th>Date</th></tr></thead>
                  <tbody>
                    {programTickets.map(t => (
                      <tr key={t.id}>
                        <td><div><div style={{fontWeight:500}}>{t.buyerName}</div><div style={{fontSize:11,color:"var(--g4)"}}>{t.buyerEmail}</div></div></td>
                        <td style={{fontFamily:"var(--mono)"}}>{t.quantity}</td>
                        <td style={{fontFamily:"var(--mono)",fontWeight:600}}>{formatCurrency(t.amount, prog.currency)}</td>
                        <td><span className={`pay-status ${t.status}`}>{t.status}</span></td>
                        <td style={{fontFamily:"var(--mono)",fontSize:11}}>{t.ticketCode}</td>
                        <td style={{fontSize:12,color:"var(--g4)"}}>{formatDate(t.purchasedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {prog.paymentMode === "installments" && prog.installments && programParticipants.length > 0 && (
          <div className="dash-section">
            <h3><I n="clock" s={16} /> Installment Timeline</h3>
            {programParticipants.map(pt => {
              const ptPayments = programPayments.filter(p => p.participantId === pt.id);
              return (
                <div key={pt.id} style={{marginBottom:20}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:8}}>{pt.name}</div>
                  <div className="inst-timeline">
                    {prog.installments.map((inst, i) => {
                      const matchPay = ptPayments.find(p => p.type === `installment_${i+1}`);
                      const status = matchPay ? (matchPay.status === "succeeded" ? "paid" : "pending") : "upcoming";
                      return (
                        <div key={i} className="inst-step">
                          <div className={`inst-dot ${status}`} />
                          <div className="inst-amount">{formatCurrency(inst.amount, prog.currency)}</div>
                          <div className="inst-label">{inst.dueLabel}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // === PROGRAM BOOKINGS (Model C) ===
  const renderProgramBookings = (prog) => {
    const progBookings = workshopBookings.filter(b => b.programId === prog.id);
    const totalRevenue = progBookings.reduce((s, b) => s + b.finalAmount, 0);
    const avgWorkshops = progBookings.length > 0 ? (progBookings.reduce((s, b) => s + b.workshopIds.length, 0) / progBookings.length).toFixed(1) : 0;

    const getWorkshopBookedCount = (wsId) => progBookings.filter(b => b.workshopIds.includes(wsId)).length;

    return (
      <div>
        <div className="pg-header"><h1 style={{fontSize:20}}>Bookings</h1><p>Workshop bookings for {prog.name}</p></div>

        <div className="fin-overview">
          <div className="fin-card collected">
            <div className="fin-amount">{progBookings.length}</div>
            <div className="fin-label">Total Bookings</div>
          </div>
          <div className="fin-card collected">
            <div className="fin-amount">{formatCurrency(totalRevenue, prog.currency)}</div>
            <div className="fin-label">Total Revenue</div>
          </div>
          <div className="fin-card">
            <div className="fin-amount" style={{color:"var(--g5)"}}>{avgWorkshops}</div>
            <div className="fin-label">Avg Workshops / Booking</div>
          </div>
        </div>

        <div className="dash-section" style={{marginBottom:24}}>
          <h3><I n="calendar" s={16} /> Workshop Fill Rates</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(prog.workshops || []).map(ws => {
              const booked = getWorkshopBookedCount(ws.id);
              const fillPct = ws.capacity > 0 ? ((booked / ws.capacity) * 100) : 0;
              return (
                <div key={ws.id} style={{padding:"12px 16px",background:"var(--g1)",borderRadius:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <div style={{fontWeight:500,fontSize:13}}>{ws.title}</div>
                    <div style={{fontSize:12,color:"var(--g4)"}}>{booked}/{ws.capacity}</div>
                  </div>
                  <div style={{height:4,borderRadius:2,background:"var(--g2)"}}>
                    <div style={{height:"100%",borderRadius:2,background:fillPct > 80 ? "var(--amber)" : "var(--ac)",width:`${Math.min(fillPct,100)}%`,transition:"width .3s"}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dash-section">
          <h3><I n="shoppingCart" s={16} /> All Bookings</h3>
          {progBookings.length === 0 ? (
            <div className="empty-state" style={{padding:32}}><p>No bookings yet.</p></div>
          ) : (
            <div style={{overflowX:"auto"}}>
              <table className="pay-table">
                <thead><tr><th>Buyer</th><th>Workshops</th><th>Amount</th><th>Discount</th><th>Date</th><th>Code</th></tr></thead>
                <tbody>
                  {progBookings.map(bk => {
                    const wsNames = bk.workshopIds.map(wid => (prog.workshops || []).find(w => w.id === wid)?.title || wid).join(", ");
                    return (
                      <tr key={bk.id}>
                        <td><div><div style={{fontWeight:500}}>{bk.buyerName}</div><div style={{fontSize:11,color:"var(--g4)"}}>{bk.buyerEmail}</div></div></td>
                        <td style={{fontSize:12,maxWidth:200}}>{wsNames}</td>
                        <td style={{fontFamily:"var(--mono)",fontWeight:600}}>{formatCurrency(bk.finalAmount, prog.currency)}</td>
                        <td style={{fontSize:12,color:bk.discountApplied > 0 ? "var(--green)" : "var(--g4)"}}>{bk.discountApplied > 0 ? `${bk.discountApplied}%` : "—"}</td>
                        <td style={{fontSize:12,color:"var(--g4)"}}>{formatDate(bk.purchasedAt)}</td>
                        <td><span style={{fontFamily:"var(--mono)",fontSize:11,background:"var(--g1)",padding:"3px 8px",borderRadius:6}}>{bk.bookingCode}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  // === PROGRAM SCHEDULE ===
  const renderProgramSchedule = (prog) => {
    const start = new Date(prog.startDate);
    const end = new Date(prog.endDate);
    const days = [];
    const cur = new Date(start);
    while (cur <= end) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return (
      <div>
        <div className="pg-header"><h1 style={{fontSize:20}}>Schedule</h1><p>{formatDate(prog.startDate)} - {formatDate(prog.endDate)}</p></div>
        <div className="schedule-list">
          {days.map((d, i) => (
            <div key={i} className="schedule-item">
              <div className="schedule-date">{d.toLocaleDateString("en-GB", {weekday:"short",day:"numeric",month:"short"})}</div>
              <div className="schedule-info">
                {i === 0 ? "Arrival & Welcome" : i === days.length - 1 ? "Final Showcase & Closing" : `Day ${i + 1} — Classes & Rehearsals`}
              </div>
              <I n="calendar" s={14} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === PROGRAM COMMUNICATION ===
  const renderProgramCommunication = (prog) => {
    const vars = ["[first_name]","[program_title]","[date]","[location]","[org_name]"];
    const categories = ["confirmation","reminder","update","waitlist","rejection"];
    const catLabel = c => ({confirmation:"Confirmation",reminder:"Reminder",update:"Update",waitlist:"Waitlist",rejection:"Rejection"}[c]||c);

    const currentTpl = editingTemplate || (selectedTemplate ? programTemplates.find(t=>t.id===selectedTemplate) : programTemplates[0]);

    return (
      <div>
        <div className="pg-header"><h1 style={{fontSize:20}}>Communication</h1><p>Manage templates and send messages to participants.</p></div>
        <div style={{display:"flex",gap:6,marginBottom:24}}>
          <button className={`chip ${commTab==="templates"?"on":""}`} onClick={()=>setCommTab("templates")}>Templates</button>
          <button className={`chip ${commTab==="broadcast"?"on":""}`} onClick={()=>setCommTab("broadcast")}>Broadcast Log</button>
        </div>

        {commTab === "templates" && (
          <div className="tpl-layout">
            <div className="tpl-list">
              <div className="tpl-list-header">
                <span>Templates</span>
                <button className="btn btn-p btn-sm btn-press" style={{padding:"4px 10px",borderRadius:20}} onClick={()=>{
                  const tpl = {id:"tpl"+Date.now(),category:"confirmation",name:"New Template",message:"Dear [first_name],\n\n"};
                  setProgramTemplates(t=>[...t,tpl]);
                  setSelectedTemplate(tpl.id);
                  setEditingTemplate({...tpl});
                }}><I n="plus" s={14} /></button>
              </div>
              <div style={{flex:1,overflow:"auto",padding:4}}>
                {categories.filter(cat=>programTemplates.some(t=>t.category===cat)).map(cat => (
                  <div key={cat} className="tpl-group">
                    <div className="tpl-group-title">{catLabel(cat)}</div>
                    {programTemplates.filter(t=>t.category===cat).map(tpl => (
                      <div key={tpl.id} className={`tpl-item ${(selectedTemplate||programTemplates[0]?.id)===tpl.id?"active":""}`} onClick={()=>{setSelectedTemplate(tpl.id);setEditingTemplate(null);}}>
                        <span className={`tpl-dot ${tpl.category}`} />
                        <span>{tpl.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="tpl-editor">
              {currentTpl ? (
                <>
                  <div className="tpl-editor-header">
                    <h3>{editingTemplate ? editingTemplate.name : currentTpl.name}</h3>
                    <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                      if(editingTemplate){
                        setProgramTemplates(ts=>ts.map(t=>t.id===editingTemplate.id?editingTemplate:t));
                        setEditingTemplate(null);
                        showToastMsg("Template saved");
                      } else {
                        setEditingTemplate({...currentTpl});
                      }
                    }}>{editingTemplate ? <><I n="check" s={14} /> Save</> : <><I n="edit" s={14} /> Edit</>}</button>
                  </div>
                  <div className="tpl-editor-body">
                    {editingTemplate ? (
                      <>
                        <div className="field"><label>Template Name</label><input value={editingTemplate.name} onChange={e=>setEditingTemplate({...editingTemplate,name:e.target.value})} /></div>
                        <div className="field"><label>Category</label>
                          <select value={editingTemplate.category} onChange={e=>setEditingTemplate({...editingTemplate,category:e.target.value})} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid var(--g2)",background:"var(--sf)",color:"var(--tx)",fontFamily:"var(--sans)",fontSize:13}}>
                            {categories.map(c=><option key={c} value={c}>{catLabel(c)}</option>)}
                          </select>
                        </div>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>Variables</div>
                          <div className="tpl-vars">
                            {vars.map(v=><button key={v} className="tpl-var" onClick={()=>setEditingTemplate({...editingTemplate,message:editingTemplate.message+v})}>{v}</button>)}
                          </div>
                        </div>
                        <textarea value={editingTemplate.message} onChange={e=>setEditingTemplate({...editingTemplate,message:e.target.value})} />
                      </>
                    ) : (
                      <>
                        <div className="field"><label>Template Name</label><input value={currentTpl.name} readOnly /></div>
                        <div className="field"><label>Category</label><input value={catLabel(currentTpl.category)} readOnly /></div>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>Variables</div>
                          <div className="tpl-vars">{vars.map(v=><span key={v} className="tpl-var">{v}</span>)}</div>
                        </div>
                        <textarea value={currentTpl.message} readOnly />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1,color:"var(--g4)",fontSize:13}}>Select a template</div>
              )}
            </div>
          </div>
        )}

        {commTab === "broadcast" && (
          <div className="tpl-layout">
            <div className="tpl-list">
              <div className="tpl-list-header"><span>Broadcast History</span></div>
              <div style={{flex:1,overflow:"auto",padding:8}}>
                {broadcastLog.length === 0 ? (
                  <div style={{textAlign:"center",padding:24,color:"var(--g4)",fontSize:12}}>No broadcasts sent yet.</div>
                ) : broadcastLog.map(bl => (
                  <div key={bl.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderBottom:"1px solid var(--g1)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span className={`tpl-dot ${bl.category}`} />
                      <div>
                        <div style={{fontSize:13,fontWeight:500}}>{bl.name}</div>
                        <div style={{fontSize:10,color:"var(--g4)"}}>{bl.recipientCount} recipients · {bl.sentAt}</div>
                      </div>
                    </div>
                    <span style={{fontSize:10,fontWeight:600,color:bl.status==="sent"?"var(--green)":"var(--g4)",textTransform:"uppercase"}}>{bl.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tpl-editor">
              <div className="tpl-editor-header">
                <h3>New Broadcast</h3>
                <span style={{fontSize:12,color:"var(--g4)"}}>Write your update or select a template</span>
              </div>
              <div className="tpl-editor-body">
                <div className="field"><label>Recipients</label>
                  <select value={broadcastRecipients} onChange={e=>setBroadcastRecipients(e.target.value)} style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid var(--g2)",background:"var(--sf)",color:"var(--tx)",fontFamily:"var(--sans)",fontSize:13}}>
                    <option value="all">All Participants</option>
                    <option value="confirmed">Confirmed Only</option>
                    <option value="pending">Pending Payment</option>
                    <option value="scholarship">Scholarship Recipients</option>
                  </select>
                </div>
                <div className="field"><label>Subject</label><input placeholder="e.g. Schedule update — important info" value={broadcastSubject} onChange={e=>setBroadcastSubject(e.target.value)} /></div>
                <div className="field"><label>Message</label>
                  <textarea placeholder={"Dear [first_name],\n\nThank you for your participation..."} value={broadcastMessage} onChange={e=>setBroadcastMessage(e.target.value)} />
                </div>
                <div className="tpl-vars">{vars.map(v=><button key={v} className="tpl-var" onClick={()=>setBroadcastMessage(m=>m+v)}>{v}</button>)}</div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}}>
                  <button className="btn btn-s btn-sm">Save Draft</button>
                  <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                    if(!broadcastSubject&&!broadcastMessage) return;
                    setBroadcastLog(bl=>[{id:"bl"+Date.now(),name:broadcastSubject||"Untitled",recipientCount:programParticipants.length,sentAt:"Just now",status:"sent",category:"update"},...bl]);
                    setBroadcastSubject("");
                    setBroadcastMessage("");
                    showToastMsg("Broadcast sent");
                  }}><I n="send" s={14} /> Send Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // === CANVAS TEMPLATE RENDERER ===
  const renderCanvasTemplate = (prog, templateId, sections, brand) => {
    if (!templateId || !sections) return null;
    const ts = TEMPLATE_STYLES[templateId];
    if (!ts) return null;
    const fp = CANVAS_FONT_PAIRS.find(f => f.id === brand?.fontPairId) || CANVAS_FONT_PAIRS[0];
    const accent = brand?.accentColor || ts.accent;
    const titleColor = brand?.titleColor || ts.text;
    const titleFontFamily = brand?.titleFont ? (CANVAS_FONTS.find(f=>f.id===brand.titleFont)?.family || fp.serif) : fp.serif;
    const bodyColor = brand?.bodyColor || ts.muted;
    const bodyFontFamily = brand?.bodyFont ? (CANVAS_FONTS.find(f=>f.id===brand.bodyFont)?.family || fp.sans) : fp.sans;
    const btnBg = brand?.buttonColor || accent;
    const btnText = brand?.buttonTextColor || "#fff";
    const sorted = [...sections].sort((a, b) => a.order - b.order).filter(s => s.enabled);

    const sectionRenderers = {
      hero: () => (
        <section key="hero" className={prog.coverImage ? "cvs-parallax-hero" : ""} style={{ position: "relative", minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: prog.coverImage ? `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5)),url(${prog.coverImage})` : prog.bannerGradient || ts.bg, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: ts.heroBg }} />
          {templateId === "grand" && (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", zIndex: 2 }}>
              <div style={{ fontSize: 11, letterSpacing: 6, color: accent, fontFamily: ts.monoFont, marginBottom: 20 }}>{MOCK_ORG.name.toUpperCase()} PRESENTS</div>
              <h1 style={{ fontSize: "clamp(42px,6vw,80px)", fontFamily: titleFontFamily, fontWeight: 300, margin: 0, lineHeight: 1.0, color: titleColor }}>{prog.name.replace(/\d{4}/, "").trim()}</h1>
              <div style={{ fontSize: 18, fontFamily: fp.serif, fontStyle: "italic", color: accent, margin: "12px 0 32px" }}>{prog.location} {prog.startDate?.slice(0, 4)}</div>
              <div className="cvs-tpl-play"><svg width="22" height="22" viewBox="0 0 24 24" fill={ts.text}><polygon points="8,5 20,12 8,19" /></svg></div>
              <div style={{ fontSize: 10, letterSpacing: 3, fontFamily: ts.monoFont, marginTop: 12, opacity: 0.5, color: ts.text }}>PLAY TRAILER</div>
            </div>
          )}
          {templateId !== "grand" && (
            <div style={{ position: "relative", zIndex: 2, padding: "0 48px 64px", maxWidth: 700 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {(prog.styles || []).slice(0, 3).concat([prog.location?.split(",")[0]]).filter(Boolean).map(t => (
                  <span key={t} className="cvs-tpl-tag" style={{ border: `1px solid ${ts.dark ? "rgba(255,255,255,.15)" : "rgba(0,0,0,.12)"}`, color: ts.muted }}>{t.toUpperCase()}</span>
                ))}
              </div>
              {templateId === "studio" ? (
                <h1 style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 800, lineHeight: 0.95, margin: 0, letterSpacing: -2, color: titleColor, fontFamily: bodyFontFamily }}>
                  DANCE.<br /><span style={{ WebkitTextStroke: `2px ${titleColor}`, color: "transparent" }}>CREATE.</span><br />MOVE.
                </h1>
              ) : (
                <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontFamily: titleFontFamily, fontWeight: 300, lineHeight: 1.05, margin: 0, color: titleColor }}>
                  {prog.name.replace(/\d{4}/, "").trim().split(" ").map((w, i, arr) => i === arr.length - 1 ? <em key={i} style={{ color: accent }}>{w}</em> : <span key={i}>{w} </span>)}
                </h1>
              )}
              <p style={{ fontSize: 16, color: bodyColor, maxWidth: 420, lineHeight: 1.7, margin: "16px 0 32px", fontWeight: 300, fontFamily: bodyFontFamily }}>
                {prog.description?.slice(0, 120)}{prog.description?.length > 120 ? "..." : ""}. {formatDate(prog.startDate)} - {formatDate(prog.endDate)}.
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button onClick={() => { if (prog.model === "B") { setArtistView("catalog"); return; } if (!artistAuth) { setShowArtistAuthModal(true); return; } if (["A","D"].includes(prog.model)) { setArtistView("apply"); setApplySubmitted(false); setApplyForm({ name: artistAuth.name, email: artistAuth.email, age: "", nationality: "", location: "", motivation: "", experience: "" }); setApplyStep(0); } else { setArtistView("checkout"); setCheckoutQty(1); setCheckoutComplete(false); setCheckoutProcessing(false); }}} style={{ background: btnBg, color: btnText, border: "none", padding: "14px 40px", borderRadius: 50, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: bodyFontFamily }}>{({ A: "Apply Now", B: "Browse Workshops", C: "Register", D: "Apply" })[prog.model] || "Register"}</button>
                <span className="cvs-tpl-verified" style={{ background: `${accent}18`, border: `1px solid ${accent}30`, color: accent }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2"/></svg>
                  LANCED
                </span>
              </div>
            </div>
          )}
        </section>
      ),

      program: () => (
        <section key="program" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          {templateId === "editorial" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, maxWidth: 1100, margin: "0 auto" }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>THE PROGRAMME</div>
                <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 20px", color: titleColor }}>{templateId === "atelier" ? "Where intention meets surprise" : "Where discipline meets artistry"}</h2>
                <p style={{ fontSize: 15, color: bodyColor, lineHeight: 1.8, fontWeight: 300, fontFamily: bodyFontFamily }}>{prog.description}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[{ l: "LEVEL", v: prog.level || "All Levels" }, { l: "DURATION", v: `${Math.ceil((new Date(prog.endDate) - new Date(prog.startDate)) / 86400000)} Days` }, { l: "CAPACITY", v: `${prog.capacity} Max` }, { l: "STYLES", v: (prog.styles || []).slice(0, 2).join(", ") }].map(i => (
                  <div key={i.l} style={{ padding: 16, borderRadius: 10, background: ts.sectionBg, border: `1px solid ${ts.border}` }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 6 }}>{i.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: ts.text, fontFamily: fp.sans }}>{i.v}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>PROGRAM</div>
              <EditableText id="program.title" defaultValue="Where discipline meets artistry" tag="h2" style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 20px", color: titleColor }} />
              <EditableText id="program.desc" defaultValue={prog.description} tag="p" style={{ fontSize: 15, color: bodyColor, lineHeight: 1.8, fontWeight: 300, fontFamily: bodyFontFamily, marginBottom: 32 }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {[{ l: "LEVEL", v: prog.level || "All Levels" }, { l: "DURATION", v: `${Math.ceil((new Date(prog.endDate) - new Date(prog.startDate)) / 86400000)} Days` }, { l: "CAPACITY", v: `${prog.capacity} Max` }, { l: "LOCATION", v: prog.location?.split(",")[0] }].map(i => (
                  <div key={i.l} style={{ padding: 16, borderRadius: 10, background: ts.sectionBg, border: `1px solid ${ts.border}` }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 6 }}>{i.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: ts.text, fontFamily: fp.sans }}>{i.v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ),

      faculty: () => {
        const fac = prog.faculty || [];
        if (fac.length === 0) return null;
        return (
          <section key="faculty" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>FACULTY</div>
              <EditableText id="faculty.title" defaultValue="Learn from the world's best" tag="h2" style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }} />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(fac.length, 4)},1fr)`, gap: 20 }}>
                {fac.map((f, i) => (
                  templateId === "editorial" ? (
                    <div key={i} style={{ display: "flex", gap: 20 }}>
                      <img src={f.photo} alt={f.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 600, color: titleColor, fontFamily: bodyFontFamily }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: accent, fontFamily: ts.monoFont, letterSpacing: 1, marginTop: 4 }}>{f.role.toUpperCase()}</div>
                        <div style={{ fontSize: 13, color: bodyColor, lineHeight: 1.5, fontWeight: 300, marginTop: 8, fontFamily: bodyFontFamily }}>{f.bio}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={i} style={{ borderRadius: 16, overflow: "hidden", background: ts.cardBg, border: `1px solid ${ts.border}` }}>
                      <div style={{ height: 200, background: `url(${f.photo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 16, fontWeight: 600, color: titleColor, fontFamily: bodyFontFamily }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: accent, fontFamily: ts.monoFont, letterSpacing: 1, marginTop: 4 }}>{f.role.toUpperCase()}</div>
                        <div style={{ fontSize: 13, color: bodyColor, lineHeight: 1.5, fontWeight: 300, marginTop: 8, fontFamily: bodyFontFamily }}>{f.bio}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </section>
        );
      },

      trailer: () => (
        <section key="trailer" className="cvs-anim-section" style={{ padding: templateId === "studio" ? "0" : "0 48px 80px", background: ts.bg }}>
          <div style={{ position: "relative", borderRadius: templateId === "studio" ? 0 : 20, overflow: "hidden", maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ paddingBottom: "45%", background: prog.coverImage ? `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5)),url(${prog.coverImage})` : (ts.dark ? "linear-gradient(135deg, #0a0a12, #1a1030)" : "linear-gradient(135deg, #e8e4f0, #d5cee8)"), backgroundSize: "cover", backgroundPosition: "center" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
              <div className="cvs-tpl-play"><svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 20,12 8,19" /></svg></div>
              <div style={{ fontSize: 10, letterSpacing: 3, fontFamily: ts.monoFont, marginTop: 12, opacity: 0.6, color: "#fff" }}>WATCH TRAILER</div>
            </div>
          </div>
        </section>
      ),

      pricing: () => {
        const tiers = [];
        if (prog.earlyBirdPrice) tiers.push({ t: "Early Bird", p: formatCurrency(prog.earlyBirdPrice, prog.currency), sub: `Until ${formatDate(prog.earlyBirdCutoff)}` });
        tiers.push({ t: "Standard", p: formatCurrency(prog.basePrice, prog.currency), hl: true, sub: prog.paymentMode === "installments" ? "Installments available" : "Full payment" });
        if (prog.scholarshipTiers?.length > 0) tiers.push({ t: "Scholarship", p: "Apply", sub: `${prog.scholarshipTiers.length} tiers available` });
        const features = ["Full program access", `${Math.ceil((new Date(prog.endDate) - new Date(prog.startDate)) / 86400000)}-day training`, "Final showcase", "Certificate"];

        return (
          <section key="pricing" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>PRICING</div>
              <EditableText id="pricing.title" defaultValue="Invest in your artistry" tag="h2" style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }} />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${tiers.length},1fr)`, gap: 20 }}>
                {tiers.map((p, i) => (
                  <div key={i} style={{ borderRadius: 20, padding: 32, background: p.hl ? `${accent}12` : ts.cardBg, border: `1px solid ${p.hl ? accent + "40" : ts.border}`, position: "relative" }}>
                    {p.hl && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: accent, padding: "3px 14px", borderRadius: "0 0 8px 8px", fontSize: 9, letterSpacing: 2, fontFamily: ts.monoFont, fontWeight: 700, color: btnText }}>RECOMMENDED</div>}
                    <div style={{ fontSize: 11, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginTop: p.hl ? 12 : 0, marginBottom: 12 }}>{p.t.toUpperCase()}</div>
                    <div style={{ fontSize: 40, fontFamily: titleFontFamily, fontWeight: 300, marginBottom: 6, color: titleColor }}>{p.p}</div>
                    <div style={{ fontSize: 12, color: bodyColor, marginBottom: 20, fontFamily: bodyFontFamily }}>{p.sub}</div>
                    {features.map((f, fi) => (
                      <div key={fi} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={{ fontSize: 13, color: bodyColor, fontWeight: 300, fontFamily: bodyFontFamily }}>{f}</span>
                      </div>
                    ))}
                    <button style={{ width: "100%", marginTop: 20, padding: "12px", borderRadius: 50, background: p.hl ? btnBg : "transparent", color: p.hl ? btnText : bodyColor, border: p.hl ? "none" : `1px solid ${ts.border}`, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: bodyFontFamily }}>Select</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },

      schedule: () => (
        <section key="schedule" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>SCHEDULE</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }}>Your journey, day by day</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[
                { w: "WEEK 1", t: "Foundation", items: ["Classical Technique", "Contemporary Basics", "Body Conditioning", "Repertoire Intro"] },
                { w: "WEEK 2", t: "Exploration", items: ["Advanced Technique", "Improvisation Lab", "Workshop Series", "Choreography"] },
                { w: "FINAL", t: "Performance", items: ["Full Rehearsals", "Stage Craft", "Dress Rehearsal", "Final Showcase"] },
              ].map((wk, i) => (
                <div key={i} style={{ background: ts.cardBg, borderRadius: 16, padding: 28, border: `1px solid ${ts.border}` }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, fontFamily: ts.monoFont, color: accent, marginBottom: 8 }}>{wk.w}</div>
                  <div style={{ fontSize: 22, fontWeight: templateId === "studio" ? 800 : 500, marginBottom: 20, color: ts.text, fontFamily: fp.sans }}>{wk.t}</div>
                  {wk.items.map((it, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: `1px solid ${ts.border}` }}>
                      <span style={{ fontSize: 12, fontFamily: ts.monoFont, color: accent, fontWeight: 600 }}>{String(j + 1).padStart(2, "0")}</span>
                      <span style={{ fontSize: 14, fontWeight: 400, color: ts.text, fontFamily: fp.sans }}>{it}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      ),

      testimonials: () => {
        const test = prog.testimonials || [];
        if (test.length === 0) return null;
        return (
          <section key="testimonials" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.sectionBg ? `${ts.bg}` : ts.bg }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>TESTIMONIALS</div>
              <EditableText id="testimonials.title" defaultValue="What dancers say" tag="h2" style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }} />
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(test.length, 3)},1fr)`, gap: 20 }}>
                {test.map((t, i) => (
                  <div key={i} style={{ padding: 32, borderRadius: 16, background: ts.cardBg, border: `1px solid ${ts.border}` }}>
                    <div style={{ fontSize: 32, color: accent, fontFamily: titleFontFamily, lineHeight: 1, marginBottom: 12 }}>"</div>
                    <div style={{ fontSize: 15, lineHeight: 1.7, color: bodyColor, fontStyle: "italic", fontFamily: bodyFontFamily, fontWeight: 300 }}>{t.quote}</div>
                    <div style={{ marginTop: 20, fontSize: 13, fontWeight: 600, color: titleColor, fontFamily: bodyFontFamily }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: bodyColor, fontFamily: ts.monoFont }}>{t.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },

      location: () => (
        <section key="location" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>LOCATION</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 32px", color: titleColor }}>{prog.venue || "Venue"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", height: 280, background: ts.dark ? "linear-gradient(135deg, #1a1a2e, #16213e)" : "linear-gradient(135deg, #e8e4f0, #d5cee8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", opacity: 0.4 }}>
                  <I n="mapPin" s={32} />
                  <div style={{ fontSize: 11, marginTop: 8, fontFamily: ts.monoFont, letterSpacing: 2 }}>MAP</div>
                </div>
              </div>
              <div>
                {[{ l: "ADDRESS", v: `${prog.venue}, ${prog.location}` }, { l: "DATES", v: `${formatDate(prog.startDate)} - ${formatDate(prog.endDate)}` }, { l: "DAILY SCHEDULE", v: "10:00 - 18:00 (1h lunch break)" }].map((item, i) => (
                  <div key={i} style={{ padding: "16px 0", borderBottom: `1px solid ${ts.border}` }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 4 }}>{item.l}</div>
                    <div style={{ fontSize: 15, color: bodyColor, fontFamily: bodyFontFamily }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ),

      faq: () => {
        const faqs = prog.faq || [];
        if (faqs.length === 0) return null;
        return (
          <section key="faq" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>FAQ</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }}>Frequently Asked Questions</h2>
              {faqs.map((fq, i) => (
                <div key={i} className="cvs-anim-card" style={{ marginBottom: 12, borderRadius: 16, border: `1px solid ${ts.border}`, overflow: "hidden", animationDelay: `${i * 0.08}s`, background: ts.dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.02)" }}>
                  <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: titleColor, fontFamily: bodyFontFamily }}>{fq.q}</div>
                    <div style={{ color: accent, fontSize: 18 }}>+</div>
                  </div>
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: bodyColor, lineHeight: 1.7, fontFamily: bodyFontFamily }}>{fq.a}</div>
                </div>
              ))}
            </div>
          </section>
        );
      },

      refunds: () => {
        const policy = prog.refundPolicy || [];
        if (policy.length === 0) return null;
        return (
          <section key="refunds" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>REFUND POLICY</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }}>Cancellation & Refunds</h2>
              <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                {policy.map((r, i) => (
                  <div key={i} className="cvs-anim-card" style={{ flex: 1, padding: 24, borderRadius: 16, background: ts.cardBg, border: `1px solid ${ts.border}`, textAlign: "center", animationDelay: `${i * 0.1}s` }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: r.refundPct > 50 ? "var(--green,#1DB954)" : r.refundPct > 0 ? accent : "var(--red,#FF4757)", fontFamily: fp.sans }}>{r.refundPct}%</div>
                    <div style={{ fontSize: 12, color: ts.muted, marginTop: 8, fontFamily: ts.monoFont }}>{r.daysBefore > 0 ? `${r.daysBefore}+ DAYS BEFORE` : "LESS THAN " + (policy[i-1]?.daysBefore || 15) + " DAYS"}</div>
                    <div style={{ width: "100%", height: 4, borderRadius: 2, background: ts.border, marginTop: 12 }}>
                      <div style={{ width: `${r.refundPct}%`, height: "100%", borderRadius: 2, background: r.refundPct > 50 ? "var(--green,#1DB954)" : r.refundPct > 0 ? accent : "var(--red,#FF4757)", transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
              {prog.refundPolicyText && <p style={{ fontSize: 14, color: bodyColor, lineHeight: 1.7, fontFamily: bodyFontFamily, fontStyle: "italic" }}>{prog.refundPolicyText}</p>}
            </div>
          </section>
        );
      },

      contact: () => (
        <section key="contact" className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: ts.monoFont, marginBottom: 12 }}>CONTACT</div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }}>Get in Touch</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                {[{ icon: "mail", l: "EMAIL", v: MOCK_ORG.email }, { icon: "mapPin", l: "LOCATION", v: prog.location }, { icon: "briefcase", l: "VENUE", v: prog.venue || "TBA" }].map((item, i) => (
                  <div key={i} className="cvs-anim-card" style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I n={item.icon} s={18} /></div>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: 2, color: accent, fontFamily: ts.monoFont, marginBottom: 4 }}>{item.l}</div>
                      <div style={{ fontSize: 14, color: bodyColor, fontFamily: bodyFontFamily }}>{item.v}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  {["globe", "heart", "send"].map((ic, i) => (
                    <div key={i} style={{ width: 40, height: 40, borderRadius: 50, border: `1px solid ${ts.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: ts.muted }}><I n={ic} s={16} /></div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input placeholder="Your name" style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${ts.border}`, background: ts.cardBg, color: ts.text, fontSize: 14, fontFamily: fp.sans }} />
                <input placeholder="Your email" style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${ts.border}`, background: ts.cardBg, color: ts.text, fontSize: 14, fontFamily: fp.sans }} />
                <textarea placeholder="Your message" rows={4} style={{ padding: "12px 16px", borderRadius: 10, border: `1px solid ${ts.border}`, background: ts.cardBg, color: ts.text, fontSize: 14, fontFamily: fp.sans, resize: "vertical" }} />
                <button className="cvs-anim-btn" style={{ background: btnBg, color: btnText, border: "none", padding: "12px 32px", borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: bodyFontFamily, alignSelf: "flex-start" }}>Send Message</button>
              </div>
            </div>
          </div>
        </section>
      ),

      weeks: () => {
        const weeks = prog.weeks || [];
        if (!weeks.length) return null;
        return (
          <section className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: fp.mono || "monospace", textTransform: "uppercase", marginBottom: 12 }}>PROGRAM WEEKS</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 40px", color: titleColor }}>Choose Your Week</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(weeks.length, 3)}, 1fr)`, gap: 20 }}>
                {weeks.map((w, i) => (
                  <div key={w.id} className="cvs-anim-card cvs-hover-lift" style={{ padding: 32, borderRadius: 16, background: ts.cardBg || "rgba(255,255,255,.03)", border: `1px solid ${ts.border || "rgba(255,255,255,.08)"}`, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ fontSize: 11, color: accent, fontFamily: fp.mono || "monospace", letterSpacing: 2, marginBottom: 12 }}>WEEK {i + 1}</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: titleColor, fontFamily: titleFontFamily, marginBottom: 8 }}>{w.name}</div>
                    <div style={{ fontSize: 13, color: bodyColor, fontFamily: bodyFontFamily, marginBottom: 16 }}>{formatDate(w.startDate)} — {formatDate(w.endDate)}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: bodyColor }}>
                      <span>{w.spotsLeft}/{w.capacity} spots</span>
                      <span style={{ fontWeight: 600, color: titleColor }}>{formatCurrency(w.price, prog.currency)}</span>
                    </div>
                    <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
                      <div style={{ height: "100%", borderRadius: 2, background: accent, width: `${((w.capacity - w.spotsLeft) / w.capacity) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      },

      workshops: () => {
        const wsList = prog.workshops || [];
        if (!wsList.length) return null;
        return (
          <section className="cvs-anim-section" style={{ padding: "80px 48px", background: ts.bg }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontFamily: fp.mono || "monospace", textTransform: "uppercase", marginBottom: 12 }}>WORKSHOPS</div>
              <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 16px", color: titleColor }}>Build Your Own Experience</h2>
              <p style={{ fontSize: 14, color: bodyColor, marginBottom: 40, fontFamily: bodyFontFamily }}>Choose from {wsList.length} workshops led by world-class artists</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {wsList.slice(0, 6).map((ws, i) => (
                  <div key={ws.id} className="cvs-anim-card cvs-hover-lift" style={{ borderRadius: 16, overflow: "hidden", background: ts.cardBg || "rgba(255,255,255,.03)", border: `1px solid ${ts.border || "rgba(255,255,255,.08)"}`, animationDelay: `${i * 0.08}s` }}>
                    <div style={{ height: 160, background: ws.image ? `url(${ws.image}) center/cover` : "linear-gradient(135deg, #1a1a2e, #2a2a3e)", position: "relative" }}>
                      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: 12, fontSize: 11, color: "#fff" }}>{ws.spotsLeft} left</div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <img src={ws.teacher.photo} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                        <span style={{ fontSize: 12, color: bodyColor, fontFamily: bodyFontFamily }}>{ws.teacher.name}</span>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: titleColor, fontFamily: titleFontFamily, marginBottom: 6 }}>{ws.title}</div>
                      <div style={{ fontSize: 12, color: bodyColor, fontFamily: bodyFontFamily, marginBottom: 12 }}>{ws.times.length} session{ws.times.length > 1 ? "s" : ""} · {ws.level}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 18, fontWeight: 700, color: titleColor }}>{formatCurrency(ws.price, prog.currency)}</span>
                        <button className="cvs-anim-btn" style={{ background: btnBg, color: btnText, border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }} onClick={() => { if (!artistAuth) { setShowArtistAuthModal(true); return; } setArtistView("catalog"); }}>Book</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {(prog.bundlePricing || []).length > 0 && (
                <div style={{ marginTop: 32, padding: "16px 24px", background: `${accent}18`, borderRadius: 12, border: `1px solid ${accent}33`, textAlign: "center" }}>
                  <span style={{ fontSize: 14, color: titleColor, fontFamily: bodyFontFamily }}>
                    {prog.bundlePricing.map(b => b.label).join(" \u00b7 ")}
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      },

      cta: () => (
        <section key="cta" className="cvs-anim-section" style={{ padding: "100px 48px", textAlign: "center", position: "relative", background: ts.bg }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${accent}10, transparent 60%)` }} />
          <div style={{ position: "relative" }}>
            {templateId === "studio" ? (
              <div style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, lineHeight: 1.0, color: titleColor, fontFamily: bodyFontFamily }}>
                DON'T JUST <span style={{ color: accent }}>WATCH.</span><br />MOVE.
              </div>
            ) : (
              <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontFamily: titleFontFamily, fontWeight: 300, margin: "0 0 16px", color: titleColor }}>
                Ready to <em style={{ color: accent }}>transform?</em>
              </h2>
            )}
            <button
              className="cvs-anim-btn"
              onClick={() => { if (prog.model === "B") { setArtistView("catalog"); return; } if (!artistAuth) { setShowArtistAuthModal(true); return; } if (["A","D"].includes(prog.model)) { setArtistView("apply"); setApplySubmitted(false); setApplyForm({ name: artistAuth.name, email: artistAuth.email, age: "", nationality: "", location: "", motivation: "", experience: "" }); setApplyStep(0); } else { setArtistView("checkout"); setCheckoutQty(1); setCheckoutComplete(false); setCheckoutProcessing(false); }}}
              style={{ background: btnBg, color: btnText, border: "none", padding: "16px 48px", borderRadius: 50, fontSize: 16, fontWeight: 600, cursor: "pointer", marginTop: 20, fontFamily: bodyFontFamily }}
            >
              {({ A: "Apply Now", B: "Browse Workshops", C: "Register Now", D: "Apply Now" })[prog.model] || "Register Now"}
            </button>
          </div>
        </section>
      ),
    };

    // Get template overrides
    const overrides = getTemplateOverrides(templateId, prog, ts, fp, accent, brand, I, MOCK_ORG, formatDate, formatCurrency, setArtistView, setApplySubmitted, setApplyForm, setCheckoutQty, setCheckoutComplete, setCheckoutProcessing, titleColor, titleFontFamily, bodyColor, bodyFontFamily, btnBg, btnText, artistAuth, setShowArtistAuthModal, setApplyStep);

    // Build section elements using overrides or defaults
    const sectionElements = sorted.map((s, idx) => {
      const renderer = overrides[s.id] || sectionRenderers[s.id];
      const el = renderer ? renderer() : null;
      if (!el) return null;
      return React.cloneElement(el, { key: s.id, style: { ...el.props.style, animationDelay: `${idx * 0.1}s` } });
    }).filter(Boolean);

    // Wrap with template-specific wrapper if available
    const content = overrides.wrapper ? overrides.wrapper(sectionElements) : sectionElements;

    return (
      <div style={{ background: ts.bg, color: ts.text, fontFamily: fp.sans, lineHeight: 1.6 }}>
        {Array.isArray(content) ? content : content}
      </div>
    );
  };

  // === CANVAS BUILDER V2 ===
  const initCanvasState = (prog) => {
    const c = prog.canvas;
    if (c?.enabled) {
      setCanvasMode("canvas");
      setCanvasTemplate(c.templateId);
      setCanvasSections(c.sections.map(s => ({ ...s })));
      setCanvasBrand({ accentColor: "#604dff", fontPairId: "instrument-outfit", logoUrl: null, heroMediaUrl: null, titleColor: null, titleFont: null, bodyColor: null, bodyFont: null, buttonColor: null, buttonTextColor: null, buttonFont: null, customDomain: "", slug: c.slug || "", ...c.brand });
      setCanvasStep(0);
      setCanvasCustomizeTab("sections");
      setCanvasDomainVerified(!!c.brand?.customDomain);
    } else {
      setCanvasMode(null);
      setCanvasTemplate(null);
      setCanvasSections([]);
      setCanvasBrand({ accentColor: "#604dff", fontPairId: "instrument-outfit", logoUrl: null, heroMediaUrl: null, titleColor: null, titleFont: null, bodyColor: null, bodyFont: null, buttonColor: null, buttonTextColor: null, buttonFont: null, customDomain: "", slug: "" });
      setCanvasStep(0);
      setCanvasCustomizeTab("sections");
      setCanvasDomainVerified(false);
    }
  };

  const saveCanvasData = (prog, publish) => {
    const slug = canvasBrand.slug || prog.canvas?.slug || prog.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const updated = programs.map(p => p.id === prog.id ? { ...p, canvas: { ...(p.canvas || {}), enabled: true, templateId: canvasTemplate, sections: canvasSections, brand: { ...canvasBrand, slug }, slug, publishedAt: publish ? new Date().toISOString() : (p.canvas?.publishedAt || null) } } : p);
    setPrograms(updated);
    showToastMsg(publish ? "Canvas published!" : "Canvas draft saved");
  };

  // Preview panel — shared across all builder steps
  const renderCanvasPreviewPanel = (prog) => {
    // Fullscreen mode
    if (canvasFullscreen) {
      return (
        <div className="cvs-fullscreen">
          <div className="cvs-fullscreen-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="btn btn-g btn-sm" onClick={() => setCanvasFullscreen(false)} style={{ color: "#fff", border: "1px solid rgba(255,255,255,.2)" }}><I n="x" s={14} /> Exit</button>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>{CANVAS_TEMPLATES.find(t => t.id === canvasTemplate)?.name || "Preview"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className={`btn btn-sm ${canvasEditMode ? "btn-p" : "btn-g"}`} onClick={() => { setCanvasEditMode(!canvasEditMode); setCanvasEditTarget(null); }} style={{ color: canvasEditMode ? "#fff" : "rgba(255,255,255,.6)", border: canvasEditMode ? "none" : "1px solid rgba(255,255,255,.2)", fontSize: 11 }}>
                <I n="edit" s={12} /> {canvasEditMode ? "Editing" : "Edit Content"}
              </button>
              <div className="cvs-device-toggle">
                {["desktop", "tablet", "mobile"].map(d => (
                  <button key={d} className={`cvs-device-btn ${canvasPreviewDevice === d ? "active" : ""}`} onClick={() => setCanvasPreviewDevice(d)} style={{ padding: "4px 10px", fontSize: 10 }}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: canvasPreviewDevice === "mobile" ? 375 : canvasPreviewDevice === "tablet" ? 768 : "100%", maxWidth: "100%", transition: "width .3s ease" }}>
              {canvasTemplate ? renderCanvasTemplate(prog, canvasTemplate, canvasSections.length > 0 ? canvasSections : CANVAS_SECTIONS_DEFAULT, canvasBrand) : null}
            </div>
          </div>
        </div>
      );
    }

    // Normal embedded preview
    return (
      <div className="cvs-editor-preview">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid var(--g2)" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {["desktop", "tablet", "mobile"].map(d => (
              <button key={d} className={`cvs-device-btn ${canvasPreviewDevice === d ? "active" : ""}`} onClick={() => setCanvasPreviewDevice(d)} style={{ padding: "4px 10px", fontSize: 10 }}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <button onClick={() => setCanvasBuilderExpanded(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, color: "#aaa", fontSize: 12, cursor: "pointer", transition: "all .15s", marginLeft: "auto" }} title="Fullscreen Builder" onMouseEnter={e => { e.currentTarget.style.background = "rgba(96,77,255,.15)"; e.currentTarget.style.borderColor = "rgba(96,77,255,.4)"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "#aaa"; }}><I n="maximize" s={14} /> <span>Fullscreen</span></button>
        </div>
        <div className="cvs-editor-preview-scroll" style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: canvasPreviewDevice === "mobile" ? 375 : canvasPreviewDevice === "tablet" ? 768 : "100%", transition: "width .3s ease", maxWidth: "100%" }}>
            <div style={{ transform: canvasPreviewDevice === "desktop" ? "scale(0.48)" : canvasPreviewDevice === "tablet" ? "scale(0.55)" : "scale(0.7)", transformOrigin: "top left", width: canvasPreviewDevice === "desktop" ? "208%" : canvasPreviewDevice === "tablet" ? "182%" : "143%", pointerEvents: "none" }}>
              {canvasTemplate ? renderCanvasTemplate(prog, canvasTemplate, canvasSections.length > 0 ? canvasSections : CANVAS_SECTIONS_DEFAULT, canvasBrand) : <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--g4)", fontSize: 14 }}>Select a template to preview</div>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 0: Template picker (left panel)
  const renderCanvasTemplatePanel = () => (
    <div className="cvs-editor-panel">
      <h4>Templates</h4>
      <p style={{ fontSize: 11, color: "var(--g4)", marginBottom: 12 }}>Choose a design for your landing page.</p>
      {CANVAS_TEMPLATES.map(tpl => {
        const tStyle = TEMPLATE_STYLES[tpl.id];
        const sel = canvasTemplate === tpl.id;
        return (
          <div key={tpl.id} style={{ marginBottom: 8, borderRadius: 12, overflow: "hidden", border: sel ? "2px solid var(--ac)" : "1px solid var(--g2)", cursor: "pointer", transition: "all .2s" }} onClick={() => { setCanvasTemplate(tpl.id); if (canvasSections.length === 0) setCanvasSections(CANVAS_SECTIONS_DEFAULT.map(s => ({ ...s }))); }}>
            <div style={{ height: 60, background: tStyle.bg, position: "relative", display: "flex", alignItems: "flex-end", padding: 8 }}>
              <div style={{ fontSize: 14, fontFamily: tStyle.headingFont, fontWeight: tpl.id === "studio" ? 800 : 300, color: tStyle.text, lineHeight: 1.1 }}>Summer <em style={{ color: tStyle.accent }}>Intensive</em></div>
              <span className={`cvs-tpl-badge ${tpl.tier}`} style={{ fontSize: 8, padding: "2px 6px" }}>{tpl.tier === "free" ? "Free" : "Pro"}</span>
              {sel && <div style={{ position: "absolute", top: 4, left: 4, width: 18, height: 18, borderRadius: "50%", background: "var(--ac)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><I n="check" s={10} /></div>}
            </div>
            <div style={{ padding: "8px 10px", background: "var(--sf)" }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{tpl.name}</div>
              <div style={{ fontSize: 10, color: "var(--g4)" }}>{tpl.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Step 1: Customize panel with sub-tabs
  const renderCanvasCustomizePanel = (prog) => {
    const handleDragStart = (idx) => setCanvasDragIdx(idx);
    const handleDragOver = (e) => { e.preventDefault(); };
    const handleDrop = (idx) => {
      if (canvasDragIdx === null || canvasDragIdx === idx) { setCanvasDragIdx(null); return; }
      const updated = [...canvasSections];
      const [moved] = updated.splice(canvasDragIdx, 1);
      updated.splice(idx, 0, moved);
      updated.forEach((s, i) => s.order = i);
      setCanvasSections(updated);
      setCanvasDragIdx(null);
    };
    const toggleSection = (idx) => {
      const updated = [...canvasSections];
      updated[idx] = { ...updated[idx], enabled: !updated[idx].enabled };
      setCanvasSections(updated);
    };
    const colors = ["#604dff", "#FF4757", "#1DB954", "#F5A623", "#0D0D12", "#C9A84C", "#FF6B9C", "#00C9DB", "#ffffff", "#1a1a1a"];
    const slug = canvasBrand.slug || prog.canvas?.slug || prog.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    return (
      <div className="cvs-editor-panel">
        <div className="cvs-sub-tabs">
          {[{id:"sections",label:"Sections"},{id:"brand",label:"Brand"},{id:"domain",label:"Domain"}].map(t => (
            <button key={t.id} className={`cvs-sub-tab ${canvasCustomizeTab === t.id ? "active" : ""}`} onClick={() => setCanvasCustomizeTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {canvasCustomizeTab === "sections" && (
          <div>
            <p style={{ fontSize: 11, color: "var(--g4)", marginBottom: 12 }}>Drag to reorder. Toggle to show/hide.</p>
            {[...canvasSections].filter(s => { if (s.id === "weeks" && prog.model !== "A") return false; if (s.id === "workshops" && prog.model !== "B") return false; return true; }).sort((a, b) => a.order - b.order).map((s, idx) => (
              <div key={s.id} className={`cvs-section-row ${canvasDragIdx === idx ? "dragging" : ""}`} draggable onDragStart={() => handleDragStart(idx)} onDragOver={handleDragOver} onDrop={() => handleDrop(idx)} onDragEnd={() => setCanvasDragIdx(null)}>
                <div className="cvs-grip"><span /><span /><span /></div>
                <div className="cvs-section-icon"><I n={s.icon || "fileText"} s={14} /></div>
                <div className={`cvs-section-label ${!s.enabled ? "disabled" : ""}`}>{s.label}</div>
                <button className={`toggle-sw toggle-smooth ${s.enabled ? "on" : ""}`} onClick={() => toggleSection(idx)} style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        )}

        {canvasCustomizeTab === "brand" && (
          <div>
            {/* Quick Preset */}
            <div className="cvs-brand-group">
              <div className="cvs-brand-group-header">Accent Color</div>
              <div className="cvs-brand-group-body">
                <div className="cvs-color-row" style={{ marginBottom: 8 }}>
                  {colors.slice(0, 8).map(c => (
                    <div key={c} className={`cvs-color-swatch ${canvasBrand.accentColor === c ? "selected" : ""}`} style={{ background: c, width: 28, height: 28 }} onClick={() => setCanvasBrand(b => ({ ...b, accentColor: c }))}>
                      {canvasBrand.accentColor === c && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c === "#ffffff" || c === "#F5A623" ? "#000" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  ))}
                </div>
                <input type="text" value={canvasBrand.accentColor} onChange={e => setCanvasBrand(b => ({ ...b, accentColor: e.target.value }))} style={{ width: "100%", padding: "6px 10px", borderRadius: 8, border: "1px solid var(--g2)", fontSize: 11, fontFamily: "var(--mono)", background: "var(--sf)", color: "var(--tx)" }} />
              </div>
            </div>

            <div className="cvs-brand-group">
              <div className="cvs-brand-group-header">Font Pairing</div>
              <div className="cvs-brand-group-body">
                {CANVAS_FONT_PAIRS.map(fpair => (
                  <div key={fpair.id} style={{ padding: "8px 12px", borderRadius: 8, border: canvasBrand.fontPairId === fpair.id ? "2px solid var(--ac)" : "1px solid var(--g2)", cursor: "pointer", marginBottom: 6, transition: "all .15s" }} onClick={() => setCanvasBrand(b => ({ ...b, fontPairId: fpair.id }))}>
                    <div style={{ fontSize: 15, fontFamily: fpair.serif, marginBottom: 2 }}>{fpair.sample}</div>
                    <div style={{ fontSize: 10, color: "var(--g4)", fontFamily: "var(--mono)" }}>{fpair.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced: Titles */}
            <div className="cvs-brand-group">
              <div className="cvs-brand-group-header">Titles</div>
              <div className="cvs-brand-group-body">
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Color</div>
                <div className="cvs-color-row" style={{ marginBottom: 10 }}>
                  {[null, ...colors.slice(0, 6)].map((c, i) => (
                    <div key={i} className={`cvs-color-swatch ${canvasBrand.titleColor === c ? "selected" : ""}`} style={{ background: c || "linear-gradient(135deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%)", backgroundSize: "8px 8px", width: 24, height: 24 }} onClick={() => setCanvasBrand(b => ({ ...b, titleColor: c }))}>
                      {canvasBrand.titleColor === c && c && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c === "#ffffff" ? "#000" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {canvasBrand.titleColor === c && !c && <span style={{fontSize:8}}>A</span>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Font</div>
                <select className="cvs-font-select" value={canvasBrand.titleFont || ""} onChange={e => setCanvasBrand(b => ({ ...b, titleFont: e.target.value || null }))}>
                  <option value="">Default (from template)</option>
                  {CANVAS_FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
              </div>
            </div>

            {/* Advanced: Body */}
            <div className="cvs-brand-group">
              <div className="cvs-brand-group-header">Body Text</div>
              <div className="cvs-brand-group-body">
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Color</div>
                <div className="cvs-color-row" style={{ marginBottom: 10 }}>
                  {[null, ...colors.slice(0, 6)].map((c, i) => (
                    <div key={i} className={`cvs-color-swatch ${canvasBrand.bodyColor === c ? "selected" : ""}`} style={{ background: c || "linear-gradient(135deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%)", backgroundSize: "8px 8px", width: 24, height: 24 }} onClick={() => setCanvasBrand(b => ({ ...b, bodyColor: c }))}>
                      {canvasBrand.bodyColor === c && c && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c === "#ffffff" ? "#000" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {canvasBrand.bodyColor === c && !c && <span style={{fontSize:8}}>A</span>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Font</div>
                <select className="cvs-font-select" value={canvasBrand.bodyFont || ""} onChange={e => setCanvasBrand(b => ({ ...b, bodyFont: e.target.value || null }))}>
                  <option value="">Default (from template)</option>
                  {CANVAS_FONTS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
                </select>
              </div>
            </div>

            {/* Advanced: Buttons */}
            <div className="cvs-brand-group">
              <div className="cvs-brand-group-header">Buttons</div>
              <div className="cvs-brand-group-body">
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Background</div>
                <div className="cvs-color-row" style={{ marginBottom: 10 }}>
                  {[null, ...colors.slice(0, 6)].map((c, i) => (
                    <div key={i} className={`cvs-color-swatch ${canvasBrand.buttonColor === c ? "selected" : ""}`} style={{ background: c || "linear-gradient(135deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%)", backgroundSize: "8px 8px", width: 24, height: 24 }} onClick={() => setCanvasBrand(b => ({ ...b, buttonColor: c }))}>
                      {canvasBrand.buttonColor === c && c && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c === "#ffffff" ? "#000" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {canvasBrand.buttonColor === c && !c && <span style={{fontSize:8}}>A</span>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Text Color</div>
                <div className="cvs-color-row" style={{ marginBottom: 10 }}>
                  {[null, "#ffffff", "#1a1a1a", "#604dff"].map((c, i) => (
                    <div key={i} className={`cvs-color-swatch ${canvasBrand.buttonTextColor === c ? "selected" : ""}`} style={{ background: c || "linear-gradient(135deg, #ccc 25%, transparent 25%, transparent 50%, #ccc 50%, #ccc 75%, transparent 75%)", backgroundSize: "8px 8px", width: 24, height: 24 }} onClick={() => setCanvasBrand(b => ({ ...b, buttonTextColor: c }))} />
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Media */}
            <div className="cvs-brand-group">
              <div className="cvs-brand-group-header">Hero Media</div>
              <div className="cvs-brand-group-body">
                <div className="cvs-upload-zone" style={{ padding: 16 }}>
                  <I n="upload" s={20} />
                  <div style={{ fontSize: 11, fontWeight: 600, marginTop: 6 }}>Upload hero image</div>
                  <div style={{ fontSize: 10, color: "var(--g4)" }}>1920x1080 recommended</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {canvasCustomizeTab === "domain" && (
          <div>
            <p style={{ fontSize: 11, color: "var(--g4)", marginBottom: 12 }}>Configure your page URL and custom domain.</p>

            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Page URL</div>
            <div className="cvs-domain-url">
              <span>lanced.com/c/</span>
              <strong>{slug}</strong>
            </div>
            <div className="field" style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 600 }}>Custom Slug</label>
              <input type="text" value={canvasBrand.slug || slug} onChange={e => setCanvasBrand(b => ({ ...b, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid var(--g2)", fontSize: 12, fontFamily: "var(--mono)", background: "var(--sf)", color: "var(--tx)", marginTop: 4 }} />
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Custom Domain</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
              <input type="text" placeholder="summer.yourstudio.com" value={canvasBrand.customDomain || ""} onChange={e => { setCanvasBrand(b => ({ ...b, customDomain: e.target.value })); setCanvasDomainVerified(false); }} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--g2)", fontSize: 12, background: "var(--sf)", color: "var(--tx)" }} />
              <button className="btn btn-p btn-sm btn-press" onClick={() => { showToastMsg("Verifying domain..."); setTimeout(() => { setCanvasDomainVerified(true); showToastMsg("Domain verified!"); }, 1500); }} disabled={!canvasBrand.customDomain}>Verify</button>
            </div>
            {canvasDomainVerified && <span className="cvs-domain-status verified"><I n="check" s={10} /> Verified</span>}
            {canvasBrand.customDomain && !canvasDomainVerified && <span className="cvs-domain-status pending"><I n="clock" s={10} /> Pending</span>}

            {canvasBrand.customDomain && (
              <div style={{ marginTop: 16, padding: 12, background: "var(--g1)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>DNS Configuration</div>
                <p style={{ fontSize: 11, color: "var(--g4)", marginBottom: 8 }}>Add a CNAME record pointing to <code style={{ background: "var(--g2)", padding: "1px 4px", borderRadius: 4, fontSize: 10 }}>pages.lanced.com</code></p>
                <table className="cvs-dns-table">
                  <thead><tr><th>Type</th><th>Name</th><th>Value</th><th>TTL</th></tr></thead>
                  <tbody><tr><td>CNAME</td><td>{canvasBrand.customDomain.split(".")[0]}</td><td>pages.lanced.com</td><td>3600</td></tr></tbody>
                </table>
                <button className="btn btn-s btn-sm" onClick={() => { navigator.clipboard?.writeText("pages.lanced.com"); showToastMsg("Copied!"); }}><I n="copy" s={10} /> Copy CNAME</button>
                <p style={{ fontSize: 10, color: "var(--g4)", marginTop: 8 }}>DNS changes can take up to 48 hours to propagate.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Step 2: Publish panel (left side)
  const renderCanvasPublishPanel = (prog) => (
    <div className="cvs-editor-panel">
      <h4>Publish</h4>
      <p style={{ fontSize: 11, color: "var(--g4)", marginBottom: 16 }}>Review your Canvas page and publish it.</p>

      <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Page URL</div>
      <div className="cvs-domain-url" style={{ marginBottom: 16 }}>
        <span>lanced.com/c/</span>
        <strong>{canvasBrand.slug || prog.canvas?.slug || prog.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}</strong>
        <button className="btn btn-s btn-sm" style={{ marginLeft: "auto" }} onClick={() => showToastMsg("URL copied")}><I n="copy" s={10} /></button>
      </div>

      {canvasBrand.customDomain && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Custom Domain</div>
          <div className="cvs-domain-url">
            <span>{canvasBrand.customDomain}</span>
            {canvasDomainVerified ? <span className="cvs-domain-status verified" style={{ marginLeft: "auto" }}><I n="check" s={10} /> Live</span> : <span className="cvs-domain-status pending" style={{ marginLeft: "auto" }}>Pending</span>}
          </div>
        </div>
      )}

      <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Template</div>
      <div style={{ padding: "8px 12px", background: "var(--g1)", borderRadius: 8, fontSize: 12, marginBottom: 16 }}>{CANVAS_TEMPLATES.find(t => t.id === canvasTemplate)?.name || "None"}</div>

      <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Active Sections</div>
      <div style={{ marginBottom: 20 }}>
        {canvasSections.filter(s => s.enabled).sort((a, b) => a.order - b.order).map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--g5)", marginBottom: 4 }}>
            <I n="check" s={12} /> {s.label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn btn-p btn-press" style={{ width: "100%", justifyContent: "center" }} onClick={() => saveCanvasData(prog, true)}>
          <I n="globe" s={14} /> Publish Canvas
        </button>
        <button className="btn btn-s" style={{ width: "100%", justifyContent: "center" }} onClick={() => saveCanvasData(prog, false)}>
          Save Draft
        </button>
      </div>
    </div>
  );

  // Standard page mode (simple)
  const renderStandardPageBuilder = (prog) => (
    <div>
      <div className="cvs-toggle-bar">
        <button className="cvs-toggle-opt active"><I n="fileText" s={14} /> Basic Page</button>
        <button className="cvs-toggle-opt" onClick={() => setCanvasMode("canvas")}><I n="zap" s={14} /> Custom Canvas</button>
      </div>

      <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, marginBottom: 4 }}>Page URL</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "var(--g1)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "var(--g4)" }}>
            <span style={{ color: "var(--g5)" }}>store.lanced.com/</span>
            <span style={{ color: "var(--ac)", fontWeight: 600 }}>{prog.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}</span>
          </div>
          <button className="btn btn-s btn-sm" onClick={() => showToastMsg("URL copied")}><I n="copy" s={14} /></button>
        </div>
      </div>

      <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, marginBottom: 4 }}>Hero Banner</h3>
        <div style={{ height: 140, borderRadius: 16, background: prog.coverImage ? `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.5)),url(${prog.coverImage})` : prog.bannerGradient || "var(--g1)", backgroundSize: "cover", backgroundPosition: "center", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%,rgba(0,0,0,.6))" }} />
          <div style={{ position: "relative", padding: 20, color: "#fff", width: "100%" }}>
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--serif)" }}>{prog.name}</div>
            <div style={{ fontSize: 12, opacity: .8, marginTop: 4 }}>{formatDate(prog.startDate)} - {formatDate(prog.endDate)} · {prog.location}</div>
          </div>
        </div>
      </div>

      <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, marginBottom: 4 }}>Trailer / Promo Video</h3>
        <div style={{ height: 80, borderRadius: 12, border: "2px dashed var(--g2)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", background: "var(--g1)" }}>
          <I n="eye" s={18} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Add a trailer or promo video</div>
            <div style={{ fontSize: 10, color: "var(--g4)" }}>MP4, MOV — max 200MB</div>
          </div>
        </div>
      </div>

      <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, marginBottom: 4 }}>Photo Gallery</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {[1, 2, 3].map(n => <div key={n} style={{ height: 60, borderRadius: 8, background: "var(--g1)", backgroundImage: prog.bannerGradient, backgroundSize: "cover", opacity: .7 }} />)}
          <div style={{ height: 60, borderRadius: 8, border: "2px dashed var(--g2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "var(--g1)" }}><I n="plus" s={16} /></div>
        </div>
      </div>

      <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, marginBottom: 8 }}>Page Sections</h3>
        {[
          { name: "Program Description", enabled: true },
          { name: "Schedule & Timetable", enabled: true },
          { name: "Instructors / Faculty", enabled: !!(prog.faculty?.length) },
          { name: "FAQ", enabled: !!(prog.faq?.length) },
          { name: "Testimonials", enabled: false },
          { name: "Location & Travel", enabled: true },
          { name: "Gallery / Media", enabled: false },
          { name: "Pricing & Payment", enabled: true },
        ].map((section, i) => (
          <div key={i} className="settings-row">
            <div><div className="sr-label">{section.name}</div></div>
            <button className={`toggle-sw ${section.enabled ? "on" : ""}`} />
          </div>
        ))}
      </div>

      <button className="btn btn-p btn-press" onClick={() => showToastMsg("Page published")} style={{ marginBottom: 24 }}>Save & Publish Page</button>
    </div>
  );

  // Mode selector (top-level)
  const renderCanvasModeSelector = () => (
    <div>
      <h3 style={{ fontSize: 16, marginBottom: 4 }}>Page Builder</h3>
      <p style={{ fontSize: 13, color: "var(--g4)", marginBottom: 16 }}>Choose how your program page looks to artists.</p>
      <div className="cvs-mode-grid">
        <div className={`cvs-mode-card ${canvasMode === "standard" ? "active" : ""}`} onClick={() => setCanvasMode("standard")}>
          <div className="cvs-mode-icon" style={{ background: "var(--g1)" }}><I n="fileText" s={24} /></div>
          <div className="cvs-mode-title">Basic Page</div>
          <div className="cvs-mode-desc">Default Lanced listing. Clean form-based layout with program details, pricing, and apply button.</div>
        </div>
        <div className={`cvs-mode-card ${canvasMode === "canvas" ? "active" : ""}`} onClick={() => { setCanvasMode("canvas"); setCanvasStep(0); }}>
          <div className="cvs-mode-icon" style={{ background: "rgba(96,77,255,.1)" }}><I n="zap" s={24} /></div>
          <div className="cvs-mode-title">Custom Canvas</div>
          <div className="cvs-mode-desc">Premium branded landing page with 10 cinematic templates, custom sections, animations, and your own design.</div>
        </div>
      </div>
    </div>
  );

  // Canvas builder content (shared between inline and fullscreen)
  const renderCanvasBuilderContent = (prog, isFullscreen) => {
    const steps = [
      { id: 0, label: "Template" },
      { id: 1, label: "Customize" },
      { id: 2, label: "Publish" },
    ];

    if (isFullscreen) {
      return (
        <div className="cvs-builder-fullscreen">
          <div className="cvs-builder-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="btn btn-g btn-sm" onClick={() => setCanvasBuilderExpanded(false)} style={{ fontSize: 11 }}><I n="arrowLeft" s={12} /> Back to App</button>
              <div className="cvs-toggle-bar" style={{ margin: 0, background: "rgba(255,255,255,.06)" }}>
                <button className="cvs-toggle-opt" onClick={() => { setCanvasMode("standard"); setCanvasBuilderExpanded(false); }} style={{ fontSize: 11, padding: "6px 14px" }}><I n="fileText" s={12} /> Basic</button>
                <button className="cvs-toggle-opt active" style={{ fontSize: 11, padding: "6px 14px" }}><I n="zap" s={12} /> Canvas</button>
              </div>
            </div>
            <div className="cvs-stepper" style={{ margin: 0, flex: 1, maxWidth: 400, justifyContent: "center" }}>
              {steps.map((s, i) => (
                <React.Fragment key={s.id}>
                  <div className={`cvs-step ${canvasStep === s.id ? "active" : ""} ${canvasStep > s.id ? "done" : ""}`} onClick={() => { if (s.id === 0 || canvasTemplate) setCanvasStep(s.id); }}>
                    <div className="cvs-step-num" style={{ width: 26, height: 26, fontSize: 11 }}>{canvasStep > s.id ? <I n="check" s={12} /> : s.id + 1}</div>
                    <div className="cvs-step-label">{s.label}</div>
                  </div>
                  {i < steps.length - 1 && <div className={`cvs-step-line ${canvasStep > s.id ? "done" : ""}`} />}
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {canvasStep > 0 && <button className="btn btn-s btn-sm" onClick={() => setCanvasStep(canvasStep - 1)} style={{ fontSize: 11 }}><I n="chevronLeft" s={12} /> Back</button>}
              {canvasStep < 2 && <button className="btn btn-p btn-sm btn-press" disabled={canvasStep === 0 && !canvasTemplate} onClick={() => { if (canvasStep === 0 && canvasSections.length === 0) setCanvasSections(CANVAS_SECTIONS_DEFAULT.map(s => ({ ...s }))); setCanvasStep(canvasStep + 1); }} style={{ fontSize: 11 }}>Next <I n="chevronRight" s={12} /></button>}
            </div>
          </div>
          <div className="cvs-editor" style={{ height: "calc(100vh - 52px)", borderRadius: 0, border: "none" }}>
            {canvasStep === 0 && renderCanvasTemplatePanel()}
            {canvasStep === 1 && renderCanvasCustomizePanel(prog)}
            {canvasStep === 2 && renderCanvasPublishPanel(prog)}
            {renderCanvasPreviewPanel(prog)}
          </div>
        </div>
      );
    }

    // Inline (in-app) mode
    return (
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="cvs-toggle-bar" style={{ margin: 0, flex: 1, maxWidth: 280 }}>
            <button className="cvs-toggle-opt" onClick={() => setCanvasMode("standard")}><I n="fileText" s={14} /> Basic</button>
            <button className="cvs-toggle-opt active"><I n="zap" s={14} /> Canvas</button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, position: "absolute", top: 12, right: 12, zIndex: 10 }}>
          <button onClick={() => setCanvasFullscreen(true)} style={{ background: "#604dff", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <I n="eye" s={14} /> Live Preview
          </button>
        </div>
        <div className="cvs-stepper">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`cvs-step ${canvasStep === s.id ? "active" : ""} ${canvasStep > s.id ? "done" : ""}`} onClick={() => { if (s.id === 0 || canvasTemplate) setCanvasStep(s.id); }}>
                <div className="cvs-step-num">{canvasStep > s.id ? <I n="check" s={14} /> : s.id + 1}</div>
                <div className="cvs-step-label">{s.label}</div>
              </div>
              {i < steps.length - 1 && <div className={`cvs-step-line ${canvasStep > s.id ? "done" : ""}`} />}
            </React.Fragment>
          ))}
        </div>
        <div className="cvs-editor">
          {canvasStep === 0 && renderCanvasTemplatePanel()}
          {canvasStep === 1 && renderCanvasCustomizePanel(prog)}
          {canvasStep === 2 && renderCanvasPublishPanel(prog)}
          {renderCanvasPreviewPanel(prog)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <div>{canvasStep > 0 && <button className="btn btn-s" onClick={() => setCanvasStep(canvasStep - 1)}><I n="chevronLeft" s={14} /> Back</button>}</div>
          {canvasStep < 2 && <button className="btn btn-p btn-press" disabled={canvasStep === 0 && !canvasTemplate} onClick={() => { if (canvasStep === 0 && canvasSections.length === 0) setCanvasSections(CANVAS_SECTIONS_DEFAULT.map(s => ({ ...s }))); setCanvasStep(canvasStep + 1); }}>Next <I n="chevronRight" s={14} /></button>}
        </div>
      </div>
    );
  };

  // Main Canvas builder entry point
  const renderCanvasBuilder = (prog) => {
    if (canvasMode === null) return renderCanvasModeSelector();
    if (canvasMode === "standard") return renderStandardPageBuilder(prog);
    if (canvasBuilderExpanded) return renderCanvasBuilderContent(prog, true);
    return renderCanvasBuilderContent(prog, false);
  };

  // === PROGRAM MARKETING ===
  const renderProgramMarketing = (prog) => {
    const confirmedCount = programParticipants.filter(p => p.status === "confirmed").length;
    const progRevenue = programPayments.filter(p => p.status === "succeeded").reduce((s, p) => s + p.amount, 0);

    return (
      <div>
        <div className="pg-header"><h1 style={{fontSize:20}}>Marketing</h1><p>Promote your program and track performance.</p></div>
        <div style={{display:"flex",gap:6,marginBottom:24}}>
          {[
            {id:"promo",label:"Page Builder"},
            {id:"assets",label:"Media Assets"},
            {id:"analytics",label:"Analytics"},
            {id:"promote",label:"Promote"}
          ].map(t => (
            <button key={t.id} className={`chip ${marketingTab===t.id?"on":""}`} onClick={()=>{setMarketingTab(t.id);if(t.id==="promo")initCanvasState(prog);}}>{t.label}</button>
          ))}
        </div>

        {marketingTab === "promo" && renderCanvasBuilder(prog)}

        {marketingTab === "assets" && (
          <div>
            <div className="settings-section anim-fade-up">
              <h3>Auto-Generated Promo Texts</h3>
              <p className="ss-sub">Ready-to-use copy for your social channels.</p>
              {[
                { platform: "Instagram", icon: "image", text: `✨ Registration is now open for ${prog.name}!\n\n📍 ${prog.location}\n📅 ${formatDate(prog.startDate)} - ${formatDate(prog.endDate)}\n💰 From ${formatCurrency(prog.basePrice, prog.currency)}\n\nLimited spots available — secure yours today!\n\n#dance #intensive #${prog.type} #danceworkshop` },
                { platform: "Twitter / X", icon: "send", text: `🔥 ${prog.name} is LIVE! Join us in ${prog.location} from ${formatDate(prog.startDate)}. ${prog.capacity} spots available. Apply now → store.lanced.com` },
                { platform: "Email Subject Line", icon: "mail", text: `You're invited: ${prog.name} — ${formatDate(prog.startDate)} in ${prog.location}` }
              ].map((promo, i) => (
                <div key={i} style={{marginBottom:12,background:"var(--g1)",borderRadius:12,padding:16}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,fontWeight:600}}><I n={promo.icon} s={14} /> {promo.platform}</div>
                    <button className="btn btn-s btn-sm" onClick={()=>{navigator.clipboard?.writeText(promo.text);showToastMsg("Copied to clipboard");}}><I n="copy" s={12} /> Copy</button>
                  </div>
                  <div style={{fontSize:12,color:"var(--g5)",whiteSpace:"pre-wrap",lineHeight:1.6}}>{promo.text}</div>
                </div>
              ))}
            </div>

            <div className="settings-section anim-fade-up">
              <h3>Shareable Assets</h3>
              <p className="ss-sub">Download ready-made promotional materials.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[
                  { name: "Program Flyer", desc: "A4 printable flyer", icon: "fileText", size: "PDF · 2.4MB" },
                  { name: "Story Template", desc: "Instagram/TikTok story", icon: "image", size: "PNG · 1.1MB" },
                  { name: "Email Banner", desc: "Header for newsletters", icon: "mail", size: "PNG · 850KB" },
                  { name: "Social Post", desc: "Square format post", icon: "image", size: "PNG · 1.5MB" },
                  { name: "Cover Photo", desc: "Facebook/LinkedIn cover", icon: "image", size: "PNG · 2.0MB" },
                  { name: "QR Code", desc: "Link to program page", icon: "grid", size: "SVG · 12KB" }
                ].map((asset, i) => (
                  <div key={i} style={{background:"var(--g1)",borderRadius:12,padding:20,textAlign:"center"}}>
                    <div style={{width:48,height:48,borderRadius:12,background:"rgba(96,77,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><I n={asset.icon} s={22} /></div>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{asset.name}</div>
                    <div style={{fontSize:11,color:"var(--g4)",marginBottom:4}}>{asset.desc}</div>
                    <div style={{fontSize:10,color:"var(--g4)",marginBottom:10}}>{asset.size}</div>
                    <button className="btn btn-s btn-sm" onClick={()=>showToastMsg("Download started")}>Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {marketingTab === "analytics" && (
          <div>
            <div className="stat-grid">
              <div className="stat-card"><div className="stat-label">Page Views</div><div className="stat-value">1,247</div><div className="stat-sub">+23% vs last week</div></div>
              <div className="stat-card"><div className="stat-label">Unique Visitors</div><div className="stat-value">892</div><div className="stat-sub">+18% vs last week</div></div>
              <div className="stat-card"><div className="stat-label">Applications</div><div className="stat-value">{programApps.length}</div><div className="stat-sub">{((programApps.length / 892) * 100).toFixed(1)}% conversion</div></div>
              <div className="stat-card"><div className="stat-label">Revenue</div><div className="stat-value" style={{color:"var(--green)"}}>{formatCurrency(progRevenue, prog.currency)}</div><div className="stat-sub">From confirmed</div></div>
            </div>

            <div className="settings-section anim-fade-up" style={{marginTop:24}}>
              <h3>Traffic Overview</h3>
              <p className="ss-sub">Page views over the last 30 days.</p>
              <div style={{display:"flex",alignItems:"flex-end",gap:4,height:160,padding:"20px 0"}}>
                {[25,42,38,55,48,72,65,80,90,75,95,110,88,105,120,98,115,130,125,140,155,145,160,135,150,170,165,180,175,190].map((v,i) => (
                  <div key={i} style={{flex:1,background:i>=27?"var(--ac)":"rgba(96,77,255,.3)",borderRadius:"3px 3px 0 0",height:`${(v/190)*100}%`,transition:"height .3s",minWidth:2}} />
                ))}
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--g4)",marginTop:4}}>
                <span>30 days ago</span><span>Today</span>
              </div>
            </div>

            <div className="settings-section anim-fade-up">
              <h3>Conversion Funnel</h3>
              <p className="ss-sub">How visitors convert to applicants and participants.</p>
              {[
                {stage:"Page Views",count:1247,pct:100,color:"var(--ac)"},
                {stage:"Started Application",count:156,pct:12.5,color:"var(--amber)"},
                {stage:"Submitted Application",count:programApps.length,pct:((programApps.length/1247)*100),color:"var(--green)"},
                {stage:"Accepted",count:programApps.filter(a=>a.status==="accepted"||a.status==="scholarship").length,pct:((programApps.filter(a=>a.status==="accepted"||a.status==="scholarship").length/1247)*100),color:"var(--green)"},
                {stage:"Confirmed & Paid",count:confirmedCount,pct:((confirmedCount/1247)*100),color:"var(--green)"}
              ].map((step,i) => (
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:13,fontWeight:500}}>{step.stage}</span>
                    <span style={{fontSize:13,fontWeight:600}}>{step.count} <span style={{fontSize:11,color:"var(--g4)",fontWeight:400}}>({step.pct.toFixed(1)}%)</span></span>
                  </div>
                  <div style={{height:8,background:"var(--g1)",borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${step.pct}%`,background:step.color,borderRadius:4,transition:"width .5s"}} />
                  </div>
                </div>
              ))}
            </div>

            <div className="settings-section anim-fade-up">
              <h3>Top Referrers</h3>
              <p className="ss-sub">Where your visitors are coming from.</p>
              {[
                {source:"Direct / Bookmark",visits:423,pct:33.9},
                {source:"Instagram",visits:312,pct:25.0},
                {source:"Google Search",visits:198,pct:15.9},
                {source:"Lanced Platform",visits:156,pct:12.5},
                {source:"WhatsApp / Messenger",visits:89,pct:7.1},
                {source:"Other",visits:69,pct:5.5}
              ].map((ref,i) => (
                <div key={i} className="settings-row">
                  <div>
                    <div className="sr-label">{ref.source}</div>
                    <div className="sr-sub">{ref.visits} visits</div>
                  </div>
                  <span style={{fontSize:13,fontWeight:600}}>{ref.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {marketingTab === "promote" && (
          <div>
            <div className="settings-section anim-fade-up">
              <h3>Promote on Lanced</h3>
              <p className="ss-sub">Boost your program's visibility on the Lanced platform.</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
                {[
                  { tier: "Starter", price: "\u20AC25", period: "excl. VAT", desc: "Get noticed. Perfect for first-time promoters and small events.", reach: null, features: ["Open Board Listing", "7-day Featured Opportunity", "Basic Analytics"], cta: "Advertise Now", popular: false, quote: false },
                  { tier: "Spotlight", price: "\u20AC75", period: "excl. VAT", desc: "Quick visibility boost. Ideal for freelance projects, workshops, and short-term castings.", reach: null, features: ["Open Board Listing", "Featured Opportunity (15 days)", "Newsletter Placement", "Instagram Story (1x)", "Express Listing (same day)"], cta: "Advertise Now", popular: false, quote: false },
                  { tier: "Campaign", price: "\u20AC250", period: "excl. VAT", desc: "Ideal for intensives, international programs, and opportunities seeking global visibility.", reach: null, features: ["Open Board Listing", "Featured Opportunity (30 days)", "Newsletter Placement", "Instagram Story (2x) + Feed Post", "30-day Banner Placement", "Advertising Support"], cta: "Advertise Now", popular: true, quote: false },
                  { tier: "Partner", price: null, period: null, desc: "Strategic collaboration with Lanced as your dedicated advertising partner.", reach: null, features: ["Custom Advertising Strategy", "Newsletter Premium Placement", "Targeted Push Notifications", "Performance Analytics", "Custom Ad Designs", "Dedicated Account Manager"], cta: "Schedule Meeting", popular: false, quote: true }
                ].map((pkg, i) => (
                  <div key={i} style={{background:"var(--sf)",border:pkg.popular?"2px solid var(--ac)":"1px solid var(--g2)",borderRadius:16,padding:24,display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
                    {pkg.popular && <div style={{background:"var(--ac)",color:"#fff",fontSize:10,fontWeight:700,padding:"6px 0",textAlign:"center",letterSpacing:".08em",textTransform:"uppercase",marginTop:-24,marginLeft:-24,marginRight:-24,marginBottom:16}}>MOST POPULAR</div>}
                    <div style={{fontSize:16,fontWeight:700,textTransform:"uppercase",letterSpacing:".03em",marginBottom:8}}>BOOST {i+1}: {pkg.tier.toUpperCase()}</div>
                    <p style={{fontSize:13,color:"var(--g5)",lineHeight:1.5,marginBottom:16,minHeight:60}}>{pkg.desc}</p>
                    {pkg.quote ? (
                      <div style={{marginBottom:16}}>
                        <div style={{fontSize:36,fontWeight:700,lineHeight:1}}>Get Quote</div>
                      </div>
                    ) : (
                      <div style={{marginBottom:16}}>
                        <span style={{fontSize:14,color:"var(--g4)",verticalAlign:"top"}}>&euro;</span>
                        <span style={{fontSize:42,fontWeight:700,fontFamily:"var(--mono)",lineHeight:1}}>{pkg.price.replace("\u20AC","")}</span>
                        <span style={{fontSize:14,color:"var(--g4)",marginLeft:2}}>,-</span>
                        <span style={{fontSize:12,color:"var(--g4)",marginLeft:8}}>{pkg.period}</span>
                      </div>
                    )}
                    <button className={pkg.popular?"btn btn-p":"btn btn-s"} style={{width:"100%",marginBottom:16}} onClick={()=>showToastMsg(pkg.quote?"Meeting request sent":`${pkg.tier} boost activated`)}>{pkg.cta}</button>
                    <div style={{borderTop:"1px solid var(--g1)",paddingTop:12}}>
                      {pkg.features.map((f,j) => (
                        <div key={j} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",fontSize:13,color:"var(--g5)"}}>
                          <div style={{width:18,height:18,borderRadius:"50%",background:"rgba(96,77,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"var(--ac)"}}><I n="check" s={10} /></div>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="settings-section anim-fade-up">
              <h3>Embed Widget</h3>
              <p className="ss-sub">Add a promotional card to your website with a simple embed code.</p>
              {renderEmbedCodeGenerator(prog.id, true)}
            </div>

            <div className="settings-section anim-fade-up">
              <h3>Promote on Social Media</h3>
              <p className="ss-sub">Connect your social accounts to share directly.</p>
              {[
                {name:"Instagram",desc:"Share to feed and stories",status:"coming_soon"},
                {name:"Facebook",desc:"Post to your page",status:"coming_soon"},
                {name:"TikTok",desc:"Create short-form content",status:"coming_soon"},
                {name:"LinkedIn",desc:"Share with professional network",status:"coming_soon"}
              ].map((social, i) => (
                <div key={i} className="settings-row">
                  <div>
                    <div className="sr-label">{social.name}</div>
                    <div className="sr-sub">{social.desc}</div>
                  </div>
                  <span style={{fontSize:10,fontWeight:600,color:"var(--g4)",background:"var(--g1)",padding:"4px 10px",borderRadius:20,textTransform:"uppercase"}}>Coming Soon</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // === PROGRAM SETTINGS ===
  const getSettingsCompletion = (prog) => {
    const items = [
      { id: "general", label: "General Info", done: !!(prog.name && prog.description && prog.startDate && prog.location) },
      { id: "application", label: "Application Form", done: !!(prog.applicationConfig?.materials?.length > 0 || prog.applicationFields?.length > 0 || prog.model === "C" || prog.model === "B") },
      { id: "refunds", label: "Refund Policy", done: !!(prog.refundPolicyText || (prog.refundPolicy && prog.refundPolicy.length > 0)) }
    ];
    const completed = items.filter(i => i.done).length;
    return { items, completed, total: items.length, allDone: completed === items.length };
  };

  const renderProgramSettings = (prog) => {
    const tiers = prog.scholarshipTiers || [];
    const completion = getSettingsCompletion(prog);
    return (
      <div>
        <div className="pg-header"><h1 style={{fontSize:20}}>Settings</h1><p>Configure program details, scholarships, and policies.</p></div>
        {!completion.allDone && (
          <div style={{ marginBottom: 24, padding: "16px 20px", background: "rgba(96,77,255,.06)", borderRadius: 12, border: "1px solid rgba(96,77,255,.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>Setup Progress</span>
              <span style={{ fontSize: 12, color: "var(--g5)" }}>{completion.completed}/{completion.total} complete</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "var(--g2)", overflow: "hidden", marginBottom: 12 }}>
              <div style={{ height: "100%", borderRadius: 3, background: "#604dff", width: `${(completion.completed / completion.total) * 100}%`, transition: "width .3s ease" }} />
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {completion.items.map(item => (
                <button key={item.id} onClick={() => setProgSettingsTab(item.id === "application" ? "application" : item.id)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, color: item.done ? "#1DB954" : "var(--g5)", padding: 0 }}>
                  {item.done ? "\u2713" : "\u25CB"} {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap"}}>
          {(() => {
            const m = prog.model;
            let tabs = ["general"];
            if (m === "A") tabs.push("application","scholarships","weeks","refunds","faq","faculty","danger");
            else if (m === "B") tabs.push("workshops","bundles","refunds","faq","danger");
            else if (m === "C") tabs.push("refunds","faq","faculty","danger");
            else if (m === "D") tabs.push("application","refunds","faq","faculty","danger");
            else tabs.push("scholarships","refunds","faq","faculty","danger");
            return tabs;
          })().map(t => (
            <button key={t} className={`chip ${progSettingsTab===t?"on":""}`} onClick={()=>setProgSettingsTab(t)}>
              {t==="general"?"General":t==="application"?"Application Form":t==="scholarships"?"Scholarships":t==="weeks"?"Weeks":t==="workshops"?"Workshops":t==="bundles"?"Bundles":t==="refunds"?"Refund Policy":t==="faq"?"FAQ":t==="faculty"?"Faculty":"Danger Zone"}
            </button>
          ))}
        </div>

        {progSettingsTab === "general" && (
          <div className="settings-section anim-fade-up">
            <div style={{marginBottom:20}}>
              <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>Banner Image</div>
              <div style={{height:120,borderRadius:16,background:prog.bannerGradient||"var(--g1)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:"2px dashed var(--g2)",position:"relative",overflow:"hidden"}}>
                {prog.bannerGradient && <div style={{position:"absolute",inset:0,background:prog.bannerGradient}} />}
                <div style={{position:"relative",textAlign:"center",color:prog.bannerGradient?"rgba(255,255,255,.7)":"var(--g4)"}}>
                  <I n="image" s={24} />
                  <div style={{fontSize:12,marginTop:4}}>Click to upload banner image</div>
                </div>
              </div>
            </div>
            <h3>Program Details</h3>
            <p className="ss-sub">Basic information about your program.</p>
            <div className="field"><label>Program Name</label><input value={prog.name} readOnly /></div>
            <div className="field"><label>Description</label><textarea value={prog.description} readOnly style={{minHeight:80}} /></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="field"><label>Start Date</label><input type="date" value={prog.startDate} readOnly /></div>
              <div className="field"><label>End Date</label><input type="date" value={prog.endDate} readOnly /></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="field"><label>Location</label><input value={prog.location} readOnly /></div>
              <div className="field"><label>Venue</label><input value={prog.venue || ""} readOnly /></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="field"><label>Capacity</label><input type="number" value={prog.capacity || ""} readOnly placeholder="Leave empty for unlimited" />{(!prog.capacity) && <div style={{fontSize:11,color:"var(--g4)",marginTop:4}}>Unlimited</div>}</div>
              <div className="field"><label>Base Price ({prog.currency})</label><input type="number" value={prog.basePrice} readOnly /></div>
            </div>
            <button className="btn btn-p btn-press" style={{marginTop:16}} onClick={()=>showToastMsg("Settings saved")}>Save Changes</button>
          </div>
        )}

        {progSettingsTab === "application" && (prog.model === "A" || prog.model === "D") && (() => {
          const config = getAppConfig(prog);
          const toggleMaterial = (matId) => {
            updateAppConfig(prog.id, c => ({
              ...c,
              materials: c.materials.includes(matId) ? c.materials.filter(m => m !== matId) : [...c.materials, matId]
            }));
          };
          const toggleField = (fieldId) => {
            updateAppConfig(prog.id, c => ({
              ...c,
              fields: c.fields.includes(fieldId) ? c.fields.filter(f => f !== fieldId) : [...c.fields, fieldId]
            }));
          };
          const addCustomQuestion = (q) => {
            updateAppConfig(prog.id, c => ({
              ...c,
              customQuestions: [...(c.customQuestions || []), { ...q, id: "cq_" + Date.now() }]
            }));
            setAppFormNewQ(null);
          };
          const removeCustomQuestion = (qId) => {
            updateAppConfig(prog.id, c => ({
              ...c,
              customQuestions: (c.customQuestions || []).filter(q => q.id !== qId)
            }));
          };
          const updateCustomQuestion = (qId, updates) => {
            updateAppConfig(prog.id, c => ({
              ...c,
              customQuestions: (c.customQuestions || []).map(q => q.id === qId ? { ...q, ...updates } : q)
            }));
            setAppFormEditing(null);
          };
          const toggleQuestionRequired = (qId) => {
            updateAppConfig(prog.id, c => ({
              ...c,
              customQuestions: (c.customQuestions || []).map(q => q.id === qId ? { ...q, required: !q.required } : q)
            }));
          };

          return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              {/* Left: Builder */}
              <div>
                {/* Section 1: Required Materials */}
                <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
                  <h3>Required Materials</h3>
                  <p className="ss-sub">Select the materials artists must upload with their application.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {STANDARD_MATERIALS.map(mat => {
                      const active = config.materials.includes(mat.id);
                      return (
                        <div key={mat.id} style={{ padding: 16, border: `1.5px solid ${active ? "var(--ac)" : "var(--g2)"}`, borderRadius: 12, background: active ? "rgba(96,77,255,.03)" : "var(--sf)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all .15s" }} onClick={() => toggleMaterial(mat.id)}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 8, background: active ? "rgba(96,77,255,.1)" : "var(--g1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <I n={mat.icon} s={16} />
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600 }}>{mat.label}</div>
                              <div style={{ fontSize: 11, color: "var(--g4)" }}>{mat.desc}</div>
                            </div>
                          </div>
                          <button className={`toggle-sw ${active ? "on" : ""}`} onClick={e => { e.stopPropagation(); toggleMaterial(mat.id); }} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Materials */}
                  <div style={{ marginTop: 16 }}>
                    <button onClick={() => {
                      const config = getAppConfig(prog);
                      const customs = config.customMaterials || [];
                      customs.push({ id: "cm_" + Date.now(), label: "", type: "file" });
                      updateAppConfig(prog.id, { ...config, customMaterials: customs });
                    }} style={{ background: "none", border: "1px dashed var(--g3)", color: "var(--g5)", padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                      + Add Custom Material
                    </button>
                  </div>

                  {/* List of custom materials */}
                  {(getAppConfig(prog).customMaterials || []).map((cm, idx) => (
                    <div key={cm.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--sf)", borderRadius: 10, border: "1px solid var(--g2)", marginTop: 12 }}>
                      <input
                        value={cm.label}
                        onChange={e => {
                          const config = getAppConfig(prog);
                          const customs = [...(config.customMaterials || [])];
                          customs[idx] = {...customs[idx], label: e.target.value};
                          updateAppConfig(prog.id, { ...config, customMaterials: customs });
                        }}
                        placeholder="Material name (e.g. Improvisation Video)"
                        style={{ flex: 1, background: "var(--g1)", border: "1px solid var(--g2)", borderRadius: 8, padding: "10px 14px", color: "var(--tx)", fontSize: 14 }}
                      />
                      <select
                        value={cm.type}
                        onChange={e => {
                          const config = getAppConfig(prog);
                          const customs = [...(config.customMaterials || [])];
                          customs[idx] = {...customs[idx], type: e.target.value};
                          updateAppConfig(prog.id, { ...config, customMaterials: customs });
                        }}
                        style={{ background: "var(--g1)", border: "1px solid var(--g2)", borderRadius: 8, padding: "10px 14px", color: "var(--tx)", fontSize: 13, width: 100 }}
                      >
                        <option value="file">File</option>
                        <option value="video">Video</option>
                        <option value="image">Image</option>
                        <option value="link">Link</option>
                      </select>
                      <button onClick={() => {
                        const config = getAppConfig(prog);
                        const customs = (config.customMaterials || []).filter((_, i) => i !== idx);
                        updateAppConfig(prog.id, { ...config, customMaterials: customs });
                      }} style={{ background: "none", border: "none", color: "var(--g4)", fontSize: 18, cursor: "pointer", padding: "4px 8px" }}>×</button>
                    </div>
                  ))}
                </div>

                {/* Section 2: Required Profile Data */}
                <div className="settings-section anim-fade-up" style={{ marginBottom: 16 }}>
                  <h3>Required Profile Data</h3>
                  <p className="ss-sub">Artists must have this data in their profile to apply. If missing, they'll be prompted to complete it.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {STANDARD_FIELDS.map(field => {
                      const active = config.fields.includes(field.id);
                      return (
                        <div key={field.id} style={{ padding: "10px 14px", border: "1px solid var(--g2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleField(field.id)}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{field.label}</span>
                          <button className={`toggle-sw ${active ? "on" : ""}`} onClick={e => { e.stopPropagation(); toggleField(field.id); }} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Custom Questions */}
                <div className="settings-section anim-fade-up">
                  <h3>Custom Questions</h3>
                  <p className="ss-sub">Add custom questions to gather specific information.</p>
                  {(config.customQuestions || []).length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
                      {(config.customQuestions || []).map(q => (
                        <div key={q.id} style={{ display: "flex", alignItems: "center", padding: "14px 18px", background: "var(--g1)", borderRadius: 10, border: "1px solid var(--g2)", marginBottom: 8 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--tx)" }}>{q.label}</div>
                            <div style={{ fontSize: 12, color: "var(--g4)", marginTop: 2 }}>
                              {QUESTION_TYPES.find(t => t.id === q.type)?.label || q.type} {q.required ? "· Required" : ""}
                            </div>
                          </div>
                          <button onClick={() => removeCustomQuestion(q.id)} style={{ background: "none", border: "none", color: "var(--g4)", cursor: "pointer", padding: 8 }}>
                            <I n="trash" s={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {appFormNewQ ? (
                    <div style={{ padding: 20, borderRadius: 12, border: "2px dashed var(--ac)", marginTop: 16 }}>
                      {/* Question Text */}
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Question Text</div>
                        <input
                          value={appFormNewQ.label}
                          onChange={e => setAppFormNewQ(q => ({...q, label: e.target.value}))}
                          placeholder="e.g. What are your goals for this program?"
                          style={{ width: "100%", background: "var(--g1)", border: "1px solid var(--g2)", borderRadius: 8, padding: "12px 14px", color: "var(--tx)", fontSize: 14, boxSizing: "border-box" }}
                        />
                      </div>

                      {/* Answer Type + Placeholder side by side */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Answer Type</div>
                          <select
                            value={appFormNewQ.type}
                            onChange={e => setAppFormNewQ(q => ({...q, type: e.target.value}))}
                            style={{ width: "100%", background: "var(--g1)", border: "1px solid var(--g2)", borderRadius: 8, padding: "12px 14px", color: "var(--tx)", fontSize: 14 }}
                          >
                            {QUESTION_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Placeholder (optional)</div>
                          <input
                            value={appFormNewQ.placeholder || ""}
                            onChange={e => setAppFormNewQ(q => ({...q, placeholder: e.target.value}))}
                            placeholder="Hint text..."
                            style={{ width: "100%", background: "var(--g1)", border: "1px solid var(--g2)", borderRadius: 8, padding: "12px 14px", color: "var(--tx)", fontSize: 14, boxSizing: "border-box" }}
                          />
                        </div>
                      </div>

                      {/* Options for select/multiselect/radio/checkbox types */}
                      {["select","multiselect","radio","checkbox"].includes(appFormNewQ.type) && (
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Options</div>
                          {(appFormNewQ.options || []).map((opt, i) => (
                            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                              <input value={opt} onChange={e => { const opts = [...(appFormNewQ.options||[])]; opts[i] = e.target.value; setAppFormNewQ(q => ({...q, options: opts})); }} style={{ flex: 1, background: "var(--g1)", border: "1px solid var(--g2)", borderRadius: 8, padding: "8px 12px", color: "var(--tx)", fontSize: 13 }} />
                              <button onClick={() => { const opts = (appFormNewQ.options||[]).filter((_,j)=>j!==i); setAppFormNewQ(q => ({...q, options: opts})); }} style={{ background: "none", border: "none", color: "var(--g4)", cursor: "pointer", fontSize: 16 }}>×</button>
                            </div>
                          ))}
                          <button onClick={() => setAppFormNewQ(q => ({...q, options: [...(q.options||[]), ""]}))} style={{ background: "none", border: "none", color: "var(--ac)", fontSize: 12, cursor: "pointer" }}>+ Add option</button>
                        </div>
                      )}

                      {/* Divider */}
                      <div style={{ borderTop: "1px solid var(--g2)", paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {/* Required toggle */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div onClick={() => setAppFormNewQ(q => ({...q, required: !q.required}))} className="toggle-smooth" style={{ width: 40, height: 22, borderRadius: 11, background: appFormNewQ.required ? "var(--ac)" : "var(--g3)", cursor: "pointer", position: "relative", transition: "background .2s" }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: appFormNewQ.required ? 20 : 2, transition: "left .2s" }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>Required</span>
                        </div>
                        {/* Cancel + Save */}
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => setAppFormNewQ(null)} style={{ background: "var(--g1)", color: "var(--tx)", border: "1px solid var(--g2)", padding: "8px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancel</button>
                          <button onClick={() => addCustomQuestion(appFormNewQ)} disabled={!appFormNewQ.label} style={{ background: "var(--ac)", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: appFormNewQ.label ? 1 : 0.5 }}>Save Question</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setAppFormNewQ({ label: "", type: "text", required: true, placeholder: "", options: [] })} style={{ background: "none", border: "1px dashed var(--g3)", color: "var(--g5)", padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
                      + Add Question
                    </button>
                  )}
                </div>
              </div>

              {/* Right: Preview */}
              <div style={{ position: "sticky", top: 24 }}>
                <div className="settings-section anim-fade-up">
                  <h3>Preview</h3>
                  <p className="ss-sub">How the application form will appear to artists.</p>
                  <div style={{ padding: 20, border: "1px solid var(--g2)", borderRadius: 14, background: "var(--g1)" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Apply to {prog.name}</div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--g4)", marginBottom: 4 }}>Full Name *</div>
                      <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--g3)", background: "var(--sf)" }} />
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--g4)", marginBottom: 4 }}>Email *</div>
                      <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--g3)", background: "var(--sf)" }} />
                    </div>
                    {config.fields.length > 0 && (
                      <div style={{ marginBottom: 12, padding: 12, borderRadius: 10, background: "rgba(29,185,84,.06)", border: "1px solid rgba(29,185,84,.15)" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#1DB954", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><I n="checkCircle" s={12} /> Profile Requirements</div>
                        {config.fields.map(fId => {
                          const f = STANDARD_FIELDS.find(sf => sf.id === fId);
                          return f ? (
                            <div key={fId} style={{ fontSize: 12, color: "var(--g5)", padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ color: "#1DB954" }}>✓</span> {f.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                    {config.materials.length > 0 && (
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--g4)", marginBottom: 6 }}>Required Materials</div>
                        {config.materials.map(mId => {
                          const mat = STANDARD_MATERIALS.find(sm => sm.id === mId);
                          return mat ? (
                            <div key={mId} style={{ fontSize: 12, color: "var(--g5)", padding: "4px 0", display: "flex", alignItems: "center", gap: 6 }}>
                              <I n={mat.icon} s={12} /> {mat.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    )}
                    {(config.customQuestions || []).map(q => (
                      <div key={q.id} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--g4)", marginBottom: 4 }}>{q.label}{q.required ? " *" : ""}</div>
                        {q.type === "textarea" ? (
                          <div style={{ height: 56, borderRadius: 8, border: "1px solid var(--g3)", background: "var(--sf)" }} />
                        ) : q.type === "select" || q.type === "multiselect" || q.type === "radio" ? (
                          <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--g3)", background: "var(--sf)", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 11, color: "var(--g4)" }}>
                            {(q.options || []).length > 0 ? q.options[0] + "..." : "Select..."}
                          </div>
                        ) : q.type === "file" ? (
                          <div style={{ height: 40, borderRadius: 8, border: "1.5px dashed var(--g3)", background: "var(--sf)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--g4)" }}>
                            <I n="upload" s={12} />&nbsp;Upload file
                          </div>
                        ) : q.type === "checkbox" ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--g5)" }}>
                            <div style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid var(--g3)" }} /> {q.label}
                          </div>
                        ) : (
                          <div style={{ height: 32, borderRadius: 8, border: "1px solid var(--g3)", background: "var(--sf)" }} />
                        )}
                      </div>
                    ))}
                    <div style={{ height: 36, borderRadius: 10, background: "var(--ac)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 600, marginTop: 16 }}>Submit Application</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {progSettingsTab === "scholarships" && (
          <div>
            <div className="settings-section anim-fade-up">
              <h3>Scholarship Tiers</h3>
              <p className="ss-sub">Create scholarships that can be awarded to applicants.</p>
              {tiers.length === 0 ? (
                <div style={{textAlign:"center",padding:"24px 0",color:"var(--g4)",fontSize:13}}>No scholarships created yet.</div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                  {tiers.map(tier => (
                    <div key={tier.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"var(--g1)",borderRadius:12}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:14}}>{tier.name}</div>
                        <div style={{fontSize:12,color:"var(--g4)",marginTop:2}}>
                          {tier.discount === 100 ? "Full scholarship" : tier.discount > 0 ? `${tier.discount}% discount` : "No discount"}
                          {tier.note && ` — ${tier.note}`}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:6}}>
                        <button className="btn btn-g btn-sm" onClick={()=>setEditScholarship(tier)}><I n="edit" s={14} /></button>
                        <button className="btn btn-danger btn-sm" onClick={()=>{
                          setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,scholarshipTiers:p.scholarshipTiers.filter(t=>t.id!==tier.id)}:p));
                          showToastMsg("Scholarship removed");
                        }}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>{editScholarship ? "Edit Scholarship" : "Add New Scholarship"}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 100px",gap:8,marginBottom:8}}>
                  <div className="field"><label>Name</label><input placeholder="e.g. Full Scholarship" value={editScholarship ? editScholarship.name : newScholarship.name} onChange={e => editScholarship ? setEditScholarship({...editScholarship, name: e.target.value}) : setNewScholarship({...newScholarship, name: e.target.value})} /></div>
                  <div className="field"><label>Discount %</label><input type="number" min="0" max="100" placeholder="100" value={editScholarship ? editScholarship.discount : newScholarship.discount} onChange={e => editScholarship ? setEditScholarship({...editScholarship, discount: e.target.value}) : setNewScholarship({...newScholarship, discount: e.target.value})} /></div>
                </div>
                <div className="field"><label>Note (optional)</label><input placeholder="e.g. Includes housing" value={editScholarship ? (editScholarship.note||"") : newScholarship.note} onChange={e => editScholarship ? setEditScholarship({...editScholarship, note: e.target.value}) : setNewScholarship({...newScholarship, note: e.target.value})} /></div>
                <div style={{display:"flex",gap:8,marginTop:12}}>
                  {editScholarship ? (
                    <>
                      <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                        setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,scholarshipTiers:p.scholarshipTiers.map(t=>t.id===editScholarship.id?{...editScholarship,discount:Number(editScholarship.discount)}:t)}:p));
                        setEditScholarship(null);
                        showToastMsg("Scholarship updated");
                      }}>Save</button>
                      <button className="btn btn-s btn-sm" onClick={()=>setEditScholarship(null)}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                      if(!newScholarship.name) return;
                      const tier = { id:"s"+Date.now(), name:newScholarship.name, discount:Number(newScholarship.discount)||0, note:newScholarship.note||"" };
                      setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,scholarshipTiers:[...p.scholarshipTiers,tier]}:p));
                      setNewScholarship({name:"",discount:"",note:""});
                      showToastMsg("Scholarship added");
                    }}>Add Scholarship</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {progSettingsTab === "refunds" && (
          <div className="settings-section anim-fade-up">
            <h3>Refund Policy</h3>
            <p className="ss-sub">Define refund rules based on cancellation timing.</p>
            {(prog.refundPolicy || []).map((r, i) => (
              <div key={i} className="settings-row">
                <div>
                  <div className="sr-label">{r.daysBefore}+ days before start</div>
                  <div className="sr-sub">Cancellation window</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:14,fontWeight:700,color:(r.refundPercent||r.refundPct||0)>0?"var(--green)":"var(--red)"}}>{r.refundPercent||r.refundPct||0}% refund</span>
                  <button className="btn btn-danger btn-sm" onClick={()=>{
                    setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,refundPolicy:p.refundPolicy.filter((_,idx)=>idx!==i)}:p));
                    showToastMsg("Rule removed");
                  }}>Remove</button>
                </div>
              </div>
            ))}
            <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginTop:12}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Add Rule</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:8,alignItems:"end"}}>
                <div className="field"><label>Days Before Start</label><input type="number" min="0" placeholder="e.g. 30" value={newRefundRule.daysBefore} onChange={e=>setNewRefundRule({...newRefundRule,daysBefore:e.target.value})} /></div>
                <div className="field"><label>Refund Percentage</label><input type="number" min="0" max="100" placeholder="e.g. 80" value={newRefundRule.refundPercent} onChange={e=>setNewRefundRule({...newRefundRule,refundPercent:e.target.value})} /></div>
                <button className="btn btn-p btn-sm btn-press" style={{marginBottom:4}} onClick={()=>{
                  if(!newRefundRule.daysBefore&&newRefundRule.daysBefore!==0) return;
                  const rule = {daysBefore:Number(newRefundRule.daysBefore),refundPct:Number(newRefundRule.refundPercent)||0};
                  setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,refundPolicy:[...(p.refundPolicy||[]),rule].sort((a,b)=>b.daysBefore-a.daysBefore)}:p));
                  setNewRefundRule({daysBefore:"",refundPercent:""});
                  showToastMsg("Rule added");
                }}>Add</button>
              </div>
            </div>
            <div style={{marginTop:20}}>
              <div className="field"><label>Refund Policy Statement</label>
                <textarea value={prog.refundPolicyText||""} onChange={e=>{const v=e.target.value;setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,refundPolicyText:v}:p));}} style={{minHeight:80}} placeholder="Describe your refund policy in full..." />
              </div>
            </div>
            <div style={{marginTop:16,padding:16,background:"var(--g1)",borderRadius:12}}>
              <div style={{fontSize:11,fontWeight:600,color:"var(--g4)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>Checkout Preview</div>
              <div style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"var(--g5)"}}>
                <input type="checkbox" checked readOnly style={{marginTop:3}} />
                <span>By purchasing, I agree to the refund policy of {MOCK_ORG.name}</span>
              </div>
            </div>
            <button className="btn btn-p btn-press" style={{marginTop:16}} onClick={()=>showToastMsg("Refund policy saved")}>Save Changes</button>
          </div>
        )}

        {progSettingsTab === "faq" && (
          <div className="settings-section anim-fade-up">
            <h3>Frequently Asked Questions</h3>
            <p className="ss-sub">Manage FAQs that appear on your program's public page.</p>
            {(prog.faq || []).length === 0 ? (
              <div style={{textAlign:"center",padding:"24px 0",color:"var(--g4)",fontSize:13}}>No FAQs added yet.</div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                {(prog.faq || []).map(item => (
                  <div key={item.id} style={{padding:"16px",background:"var(--g1)",borderRadius:12}}>
                    {editFaq && editFaq.id === item.id ? (
                      <div>
                        <div className="field"><label>Question</label><input value={editFaq.q} onChange={e=>setEditFaq({...editFaq,q:e.target.value})} /></div>
                        <div className="field"><label>Answer</label><textarea value={editFaq.a} onChange={e=>setEditFaq({...editFaq,a:e.target.value})} style={{minHeight:60}} /></div>
                        <div style={{display:"flex",gap:8,marginTop:8}}>
                          <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                            setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,faq:p.faq.map(f=>f.id===editFaq.id?editFaq:f)}:p));
                            setEditFaq(null);
                            showToastMsg("FAQ updated");
                          }}>Save</button>
                          <button className="btn btn-s btn-sm" onClick={()=>setEditFaq(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>{item.q}</div>
                        <div style={{fontSize:13,color:"var(--g5)",lineHeight:1.5}}>{item.a}</div>
                        <div style={{display:"flex",gap:6,marginTop:8}}>
                          <button className="btn btn-g btn-sm" onClick={()=>setEditFaq(item)}><I n="edit" s={14} /> Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={()=>{
                            setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,faq:p.faq.filter(f=>f.id!==item.id)}:p));
                            showToastMsg("FAQ removed");
                          }}>Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Add FAQ</div>
              <div className="field"><label>Question</label><input placeholder="e.g. Where is the venue located?" value={newFaq.q} onChange={e=>setNewFaq({...newFaq,q:e.target.value})} /></div>
              <div className="field"><label>Answer</label><textarea placeholder="Provide a helpful answer..." value={newFaq.a} onChange={e=>setNewFaq({...newFaq,a:e.target.value})} style={{minHeight:60}} /></div>
              <button className="btn btn-p btn-sm btn-press" style={{marginTop:8}} onClick={()=>{
                if(!newFaq.q||!newFaq.a) return;
                const faqItem = {id:"fq"+Date.now(),q:newFaq.q,a:newFaq.a};
                setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,faq:[...(p.faq||[]),faqItem]}:p));
                setNewFaq({q:"",a:""});
                showToastMsg("FAQ added");
              }}>Add FAQ</button>
            </div>
            <button className="btn btn-s" onClick={()=>{
              const suggested = [
                { id: "fqs1", q: "Where is the venue located?", a: "Please check the program page for venue details and directions." },
                { id: "fqs2", q: "What should I bring?", a: "Please bring comfortable dance clothing, water bottle, and any personal items you may need." },
                { id: "fqs3", q: "Is accommodation included?", a: "Accommodation is not included. We can recommend nearby options upon request." },
                { id: "fqs4", q: "Are meals provided?", a: "Light refreshments are provided. Full meals are not included." },
                { id: "fqs5", q: "What is the cancellation policy?", a: "Please refer to our refund policy in the program settings." }
              ];
              const existing = (prog.faq || []).map(f=>f.q.toLowerCase());
              const toAdd = suggested.filter(s=>!existing.includes(s.q.toLowerCase()));
              if(toAdd.length === 0) { showToastMsg("All suggested FAQs already added"); return; }
              setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,faq:[...(p.faq||[]),...toAdd]}:p));
              showToastMsg(`${toAdd.length} suggested FAQ${toAdd.length>1?"s":""} added`);
            }}><I n="plus" s={14} /> Add Suggested FAQs</button>
          </div>
        )}

        {progSettingsTab === "weeks" && (
          <div className="settings-section anim-fade-up">
            <h3>Program Weeks</h3>
            <p className="ss-sub">Define the weeks for your multi-week program. Artists will be assigned to specific weeks after acceptance.</p>
            {(prog.weeks || []).length === 0 ? (
              <div style={{textAlign:"center",padding:"24px 0",color:"var(--g4)",fontSize:13}}>No weeks defined yet.</div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                {(prog.weeks || []).map((wk, wi) => (
                  <div key={wk.id} style={{padding:"16px 20px",background:"var(--g1)",borderRadius:12}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:14}}>{wk.name}</div>
                        <div style={{fontSize:12,color:"var(--g4)",marginTop:2}}>{formatDate(wk.startDate)} — {formatDate(wk.endDate)}</div>
                      </div>
                      <div style={{display:"flex",gap:6}}>
                        <button className="btn btn-g btn-sm" onClick={()=>setEditWeek(wk)}><I n="edit" s={14} /></button>
                        <button className="btn btn-danger btn-sm" onClick={()=>{
                          setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,weeks:(p.weeks||[]).filter(w=>w.id!==wk.id)}:p));
                          showToastMsg("Week removed");
                        }}>Remove</button>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:16,fontSize:12,color:"var(--g5)"}}>
                      <span>Capacity: {wk.capacity}</span>
                      <span>Price: {formatCurrency(wk.price, prog.currency)}</span>
                      <span>Spots left: {wk.spotsLeft ?? wk.capacity}/{wk.capacity}</span>
                    </div>
                    <div style={{marginTop:8,height:4,borderRadius:2,background:"var(--g2)"}}>
                      <div style={{height:"100%",borderRadius:2,background:"var(--ac)",width:`${(((wk.capacity - (wk.spotsLeft ?? wk.capacity)) / wk.capacity) * 100)}%`}} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {editWeek && (
              <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Edit Week</div>
                <div className="field"><label>Week Name</label><input value={editWeek.name} onChange={e=>setEditWeek(w=>({...w,name:e.target.value}))} /></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div className="field"><label>Start Date</label><input type="date" value={editWeek.startDate} onChange={e=>setEditWeek(w=>({...w,startDate:e.target.value}))} /></div>
                  <div className="field"><label>End Date</label><input type="date" value={editWeek.endDate} onChange={e=>setEditWeek(w=>({...w,endDate:e.target.value}))} /></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div className="field"><label>Capacity</label><input type="number" value={editWeek.capacity} onChange={e=>setEditWeek(w=>({...w,capacity:parseInt(e.target.value)||0}))} /></div>
                  <div className="field"><label>Price ({prog.currency})</label><input type="number" value={editWeek.price} onChange={e=>setEditWeek(w=>({...w,price:parseFloat(e.target.value)||0}))} /></div>
                </div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button className="btn btn-s btn-sm" onClick={()=>setEditWeek(null)}>Cancel</button>
                  <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                    setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,weeks:(p.weeks||[]).map(w=>w.id===editWeek.id?editWeek:w)}:p));
                    setEditWeek(null);
                    showToastMsg("Week updated");
                  }}>Save</button>
                </div>
              </div>
            )}
            <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Add New Week</div>
              <div className="field"><label>Week Name</label><input value={newWeek.name} onChange={e=>setNewWeek(w=>({...w,name:e.target.value}))} placeholder="e.g. Week 1: Foundations" /></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div className="field"><label>Start Date</label><input type="date" value={newWeek.startDate} onChange={e=>setNewWeek(w=>({...w,startDate:e.target.value}))} /></div>
                <div className="field"><label>End Date</label><input type="date" value={newWeek.endDate} onChange={e=>setNewWeek(w=>({...w,endDate:e.target.value}))} /></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div className="field"><label>Capacity</label><input type="number" value={newWeek.capacity} onChange={e=>setNewWeek(w=>({...w,capacity:parseInt(e.target.value)||0}))} placeholder="20" /></div>
                <div className="field"><label>Price ({prog.currency})</label><input type="number" value={newWeek.price} onChange={e=>setNewWeek(w=>({...w,price:e.target.value}))} placeholder="300" /></div>
              </div>
              <button className="btn btn-p btn-sm btn-press" style={{marginTop:8}} onClick={()=>{
                if(!newWeek.name) return;
                const wk = { id: "w" + Date.now(), name: newWeek.name, startDate: newWeek.startDate, endDate: newWeek.endDate, capacity: parseInt(newWeek.capacity)||20, price: parseFloat(newWeek.price)||0, spotsLeft: parseInt(newWeek.capacity)||20 };
                setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,weeks:[...(p.weeks||[]),wk]}:p));
                setNewWeek({ name: "", startDate: "", endDate: "", capacity: "", price: "" });
                showToastMsg("Week added");
              }}><I n="plus" s={14} /> Add Week</button>
            </div>
          </div>
        )}

        {progSettingsTab === "faculty" && (
          <div className="settings-section anim-fade-up">
            <h3>Faculty & Teachers</h3>
            <p className="ss-sub">Add instructors and guest artists for this program.</p>

            {(prog.faculty || []).map((f, i) => (
              <div key={i} className="cvs-faculty-card">
                {f.photo ? <img src={f.photo} alt={f.name} className="cvs-faculty-avatar" /> : <div className="cvs-faculty-avatar" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "var(--ac)" }}>{f.name.charAt(0)}</div>}
                <div className="cvs-faculty-info">
                  <div className="cvs-faculty-name">{f.name}</div>
                  <div className="cvs-faculty-role">{f.role}</div>
                  {f.bio && <div style={{ fontSize: 11, color: "var(--g4)", marginTop: 4, lineHeight: 1.4 }}>{f.bio.substring(0, 80)}{f.bio.length > 80 ? "..." : ""}</div>}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className="btn btn-g btn-sm" onClick={() => setEditFaculty(i)}><I n="edit" s={14} /></button>
                  <button className="btn btn-g btn-sm" onClick={() => {
                    const updated = programs.map(p => p.id === prog.id ? { ...p, faculty: (p.faculty || []).filter((_, fi) => fi !== i) } : p);
                    setPrograms(updated);
                    showToastMsg("Faculty removed");
                  }}><I n="trash" s={14} /></button>
                </div>
              </div>
            ))}

            {editFaculty !== null && (
              <div style={{ padding: 16, background: "var(--g1)", borderRadius: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Edit Faculty</div>
                {(() => {
                  const f = (prog.faculty || [])[editFaculty];
                  if (!f) return null;
                  return (
                    <div>
                      <div className="field-row" style={{ marginBottom: 8 }}>
                        <div className="field"><label>Name</label><input type="text" defaultValue={f.name} onChange={e => { const fac = [...(prog.faculty || [])]; fac[editFaculty] = { ...fac[editFaculty], name: e.target.value }; setPrograms(programs.map(p => p.id === prog.id ? { ...p, faculty: fac } : p)); }} /></div>
                        <div className="field"><label>Role</label><input type="text" defaultValue={f.role} onChange={e => { const fac = [...(prog.faculty || [])]; fac[editFaculty] = { ...fac[editFaculty], role: e.target.value }; setPrograms(programs.map(p => p.id === prog.id ? { ...p, faculty: fac } : p)); }} /></div>
                      </div>
                      <div className="field"><label>Bio</label><textarea defaultValue={f.bio} rows={2} onChange={e => { const fac = [...(prog.faculty || [])]; fac[editFaculty] = { ...fac[editFaculty], bio: e.target.value }; setPrograms(programs.map(p => p.id === prog.id ? { ...p, faculty: fac } : p)); }} /></div>
                      <div className="field"><label>Photo URL</label><input type="text" defaultValue={f.photo} onChange={e => { const fac = [...(prog.faculty || [])]; fac[editFaculty] = { ...fac[editFaculty], photo: e.target.value }; setPrograms(programs.map(p => p.id === prog.id ? { ...p, faculty: fac } : p)); }} /></div>
                      <button className="btn btn-p btn-sm btn-press" onClick={() => { setEditFaculty(null); showToastMsg("Faculty updated"); }}>Done</button>
                    </div>
                  );
                })()}
              </div>
            )}

            <div style={{ padding: 16, border: "1px solid var(--g2)", borderRadius: 12, marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Add Faculty Member</div>
              <div className="field-row">
                <div className="field"><label>Name *</label><input type="text" value={newFaculty.name} onChange={e => setNewFaculty(f => ({ ...f, name: e.target.value }))} placeholder="Full name" /></div>
                <div className="field"><label>Role *</label><input type="text" value={newFaculty.role} onChange={e => setNewFaculty(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Guest Choreographer" /></div>
              </div>
              <div className="field"><label>Bio</label><textarea value={newFaculty.bio} onChange={e => setNewFaculty(f => ({ ...f, bio: e.target.value }))} rows={2} placeholder="Short bio..." /></div>
              <div className="field"><label>Photo URL</label><input type="text" value={newFaculty.photo} onChange={e => setNewFaculty(f => ({ ...f, photo: e.target.value }))} placeholder="https://..." /></div>
              <button className="btn btn-p btn-sm btn-press" disabled={!newFaculty.name || !newFaculty.role} onClick={() => {
                const updated = programs.map(p => p.id === prog.id ? { ...p, faculty: [...(p.faculty || []), { ...newFaculty }] } : p);
                setPrograms(updated);
                setNewFaculty({ name: "", role: "", bio: "", photo: "" });
                showToastMsg("Faculty added");
              }}>Add Faculty</button>
            </div>
          </div>
        )}


        {progSettingsTab === "workshops" && prog.model === "B" && (
          <div className="settings-section anim-fade-up">
            <h3>Workshop Catalog</h3>
            <p className="ss-sub">Manage the workshops artists can browse and book</p>
            {(prog.workshops || []).length === 0 && !newWorkshop ? (
              <div style={{textAlign:"center",padding:"40px 0"}}>
                <div style={{width:56,height:56,borderRadius:16,background:"rgba(96,77,255,.08)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><I n="calendar" s={24} /></div>
                <div style={{color:"var(--g4)",fontSize:13,marginBottom:16}}>No workshops added yet.</div>
                <button className="btn btn-p btn-sm btn-press" onClick={()=>setNewWorkshop({title:"",description:"",teacherName:"",teacherPhoto:"",teacherBio:"",image:"",price:"",capacity:"",level:"All Levels",styles:"",times:[{date:"",startTime:"",endTime:""}],trailerUrl:""})}><I n="plus" s={14} /> Add your first workshop</button>
              </div>
            ) : (
              <>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                  {(prog.workshops || []).map(ws => {
                    const booked = (ws.capacity || 0) - (ws.spotsLeft ?? ws.capacity);
                    const fillPct = ws.capacity > 0 ? ((booked / ws.capacity) * 100) : 0;
                    return (
                      <div key={ws.id} style={{padding:"14px 16px",background:"var(--g1)",borderRadius:12,display:"flex",gap:14,alignItems:"flex-start"}}>
                        {ws.image && <img src={ws.image} alt="" style={{width:80,height:80,borderRadius:12,objectFit:"cover",flexShrink:0}} />}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontWeight:600,fontSize:15}}>{ws.title}</div>
                          <div style={{fontSize:13,color:"var(--g4)",marginTop:2}}>{ws.teacher?.name || "TBA"}</div>
                          <div style={{fontSize:13,color:"var(--g5)",marginTop:4,display:"flex",gap:12}}>
                            <span>{formatCurrency(ws.price, prog.currency)}</span>
                            <span>{booked}/{ws.capacity} booked</span>
                          </div>
                          <div style={{marginTop:6,height:4,borderRadius:2,background:"var(--g2)"}}>
                            <div style={{height:"100%",borderRadius:2,background:"var(--ac)",width:`${fillPct}%`,transition:"width .3s"}} />
                          </div>
                        </div>
                        <div style={{display:"flex",gap:6,flexShrink:0}}>
                          <button className="btn btn-g btn-sm" onClick={()=>setEditWorkshop({...ws,teacherName:ws.teacher?.name||"",teacherPhoto:ws.teacher?.photo||"",teacherBio:ws.teacher?.bio||"",styles:(ws.styles||[]).join(", "),times:ws.times||[{date:"",startTime:"",endTime:""}]})}><I n="edit" s={14} /></button>
                          <button className="btn btn-danger btn-sm" onClick={()=>{
                            setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,workshops:(p.workshops||[]).filter(w=>w.id!==ws.id)}:p));
                            showToastMsg("Workshop removed");
                          }}>Remove</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {editWorkshop && (
              <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Edit Workshop</div>
                <div className="field"><label>Title</label><input value={editWorkshop.title} onChange={e=>setEditWorkshop(w=>({...w,title:e.target.value}))} /></div>
                <div className="field"><label>Description</label><textarea rows={3} value={editWorkshop.description} onChange={e=>setEditWorkshop(w=>({...w,description:e.target.value}))} /></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div className="field"><label>Teacher Name</label><input value={editWorkshop.teacherName} onChange={e=>setEditWorkshop(w=>({...w,teacherName:e.target.value}))} /></div>
                  <div className="field"><label>Teacher Photo URL</label><input value={editWorkshop.teacherPhoto} onChange={e=>setEditWorkshop(w=>({...w,teacherPhoto:e.target.value}))} /></div>
                </div>
                <div className="field"><label>Teacher Bio</label><textarea rows={2} value={editWorkshop.teacherBio} onChange={e=>setEditWorkshop(w=>({...w,teacherBio:e.target.value}))} /></div>
                <div className="field"><label>Image URL</label><input value={editWorkshop.image} onChange={e=>setEditWorkshop(w=>({...w,image:e.target.value}))} /></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  <div className="field"><label>Price ({prog.currency})</label><input type="number" value={editWorkshop.price} onChange={e=>setEditWorkshop(w=>({...w,price:parseFloat(e.target.value)||0}))} /></div>
                  <div className="field"><label>Capacity</label><input type="number" value={editWorkshop.capacity} onChange={e=>setEditWorkshop(w=>({...w,capacity:parseInt(e.target.value)||0}))} /></div>
                  <div className="field"><label>Level</label>
                    <select value={editWorkshop.level} onChange={e=>setEditWorkshop(w=>({...w,level:e.target.value}))}>
                      <option>All Levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Professional</option>
                    </select>
                  </div>
                </div>
                <div className="field"><label>Styles <span style={{fontWeight:400,color:"var(--g4)"}}>(comma-separated)</span></label><input value={editWorkshop.styles} onChange={e=>setEditWorkshop(w=>({...w,styles:e.target.value}))} placeholder="e.g. Contemporary, Release, Floorwork" /></div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>Session Dates</div>
                  {(editWorkshop.times||[]).map((t,ti)=>(
                    <div key={ti} style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                      <input type="date" value={t.date} onChange={e=>{const ts=[...(editWorkshop.times||[])];ts[ti]={...ts[ti],date:e.target.value};setEditWorkshop(w=>({...w,times:ts}));}} style={{flex:1}} />
                      <input type="time" value={t.startTime} onChange={e=>{const ts=[...(editWorkshop.times||[])];ts[ti]={...ts[ti],startTime:e.target.value};setEditWorkshop(w=>({...w,times:ts}));}} />
                      <span style={{color:"var(--g4)",fontSize:12}}>to</span>
                      <input type="time" value={t.endTime} onChange={e=>{const ts=[...(editWorkshop.times||[])];ts[ti]={...ts[ti],endTime:e.target.value};setEditWorkshop(w=>({...w,times:ts}));}} />
                      {(editWorkshop.times||[]).length > 1 && <button className="btn btn-danger btn-sm" onClick={()=>{const ts=(editWorkshop.times||[]).filter((_,i)=>i!==ti);setEditWorkshop(w=>({...w,times:ts}));}}><I n="x" s={12} /></button>}
                    </div>
                  ))}
                  <button className="btn btn-g btn-sm" onClick={()=>setEditWorkshop(w=>({...w,times:[...(w.times||[]),{date:"",startTime:"",endTime:""}]}))}><I n="plus" s={12} /> Add Date</button>
                </div>
                <div className="field"><label>Trailer URL <span style={{fontWeight:400,color:"var(--g4)"}}>(optional)</span></label><input value={editWorkshop.trailerUrl||""} onChange={e=>setEditWorkshop(w=>({...w,trailerUrl:e.target.value}))} /></div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button className="btn btn-s btn-sm" onClick={()=>setEditWorkshop(null)}>Cancel</button>
                  <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                    const updated = {...editWorkshop, teacher:{name:editWorkshop.teacherName,photo:editWorkshop.teacherPhoto,bio:editWorkshop.teacherBio}, styles:editWorkshop.styles.split(",").map(s=>s.trim()).filter(Boolean)};
                    delete updated.teacherName; delete updated.teacherPhoto; delete updated.teacherBio;
                    setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,workshops:(p.workshops||[]).map(w=>w.id===updated.id?updated:w)}:p));
                    setEditWorkshop(null);
                    showToastMsg("Workshop updated");
                  }}>Save</button>
                </div>
              </div>
            )}

            {!newWorkshop && (prog.workshops||[]).length > 0 && (
              <button className="btn btn-p btn-sm btn-press" onClick={()=>setNewWorkshop({title:"",description:"",teacherName:"",teacherPhoto:"",teacherBio:"",image:"",price:"",capacity:"",level:"All Levels",styles:"",times:[{date:"",startTime:"",endTime:""}],trailerUrl:""})}><I n="plus" s={14} /> Add Workshop</button>
            )}

            {newWorkshop && (
              <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginTop:16}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Add New Workshop</div>
                <div className="field"><label>Title</label><input value={newWorkshop.title} onChange={e=>setNewWorkshop(w=>({...w,title:e.target.value}))} placeholder="e.g. Gaga Movement Language" /></div>
                <div className="field"><label>Description</label><textarea rows={3} value={newWorkshop.description} onChange={e=>setNewWorkshop(w=>({...w,description:e.target.value}))} placeholder="Brief description of the workshop..." /></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div className="field"><label>Teacher Name</label><input value={newWorkshop.teacherName} onChange={e=>setNewWorkshop(w=>({...w,teacherName:e.target.value}))} placeholder="Instructor name" /></div>
                  <div className="field"><label>Teacher Photo URL</label><input value={newWorkshop.teacherPhoto} onChange={e=>setNewWorkshop(w=>({...w,teacherPhoto:e.target.value}))} placeholder="https://..." /></div>
                </div>
                <div className="field"><label>Teacher Bio</label><textarea rows={2} value={newWorkshop.teacherBio} onChange={e=>setNewWorkshop(w=>({...w,teacherBio:e.target.value}))} placeholder="Short bio..." /></div>
                <div className="field"><label>Image URL</label><input value={newWorkshop.image} onChange={e=>setNewWorkshop(w=>({...w,image:e.target.value}))} placeholder="https://..." /></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                  <div className="field"><label>Price ({prog.currency})</label><input type="number" value={newWorkshop.price} onChange={e=>setNewWorkshop(w=>({...w,price:e.target.value}))} placeholder="85" /></div>
                  <div className="field"><label>Capacity</label><input type="number" value={newWorkshop.capacity} onChange={e=>setNewWorkshop(w=>({...w,capacity:e.target.value}))} placeholder="30" /></div>
                  <div className="field"><label>Level</label>
                    <select value={newWorkshop.level} onChange={e=>setNewWorkshop(w=>({...w,level:e.target.value}))}>
                      <option>All Levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Professional</option>
                    </select>
                  </div>
                </div>
                <div className="field"><label>Styles <span style={{fontWeight:400,color:"var(--g4)"}}>(comma-separated)</span></label><input value={newWorkshop.styles} onChange={e=>setNewWorkshop(w=>({...w,styles:e.target.value}))} placeholder="e.g. Contemporary, Release, Floorwork" /></div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>Session Dates</div>
                  {(newWorkshop.times||[]).map((t,ti)=>(
                    <div key={ti} style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
                      <input type="date" value={t.date} onChange={e=>{const ts=[...(newWorkshop.times||[])];ts[ti]={...ts[ti],date:e.target.value};setNewWorkshop(w=>({...w,times:ts}));}} style={{flex:1}} />
                      <input type="time" value={t.startTime} onChange={e=>{const ts=[...(newWorkshop.times||[])];ts[ti]={...ts[ti],startTime:e.target.value};setNewWorkshop(w=>({...w,times:ts}));}} />
                      <span style={{color:"var(--g4)",fontSize:12}}>to</span>
                      <input type="time" value={t.endTime} onChange={e=>{const ts=[...(newWorkshop.times||[])];ts[ti]={...ts[ti],endTime:e.target.value};setNewWorkshop(w=>({...w,times:ts}));}} />
                      {(newWorkshop.times||[]).length > 1 && <button className="btn btn-danger btn-sm" onClick={()=>{const ts=(newWorkshop.times||[]).filter((_,i)=>i!==ti);setNewWorkshop(w=>({...w,times:ts}));}}><I n="x" s={12} /></button>}
                    </div>
                  ))}
                  <button className="btn btn-g btn-sm" onClick={()=>setNewWorkshop(w=>({...w,times:[...(w.times||[]),{date:"",startTime:"",endTime:""}]}))}><I n="plus" s={12} /> Add Date</button>
                </div>
                <div className="field"><label>Trailer URL <span style={{fontWeight:400,color:"var(--g4)"}}>(optional)</span></label><input value={newWorkshop.trailerUrl||""} onChange={e=>setNewWorkshop(w=>({...w,trailerUrl:e.target.value}))} placeholder="https://..." /></div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button className="btn btn-s btn-sm" onClick={()=>setNewWorkshop(null)}>Cancel</button>
                  <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                    if(!newWorkshop.title) return;
                    const ws = { id: "ws" + Date.now(), title: newWorkshop.title, description: newWorkshop.description, teacher: {name:newWorkshop.teacherName,photo:newWorkshop.teacherPhoto,bio:newWorkshop.teacherBio}, image: newWorkshop.image, price: parseFloat(newWorkshop.price)||0, location: "", level: newWorkshop.level, styles: newWorkshop.styles.split(",").map(s=>s.trim()).filter(Boolean), capacity: parseInt(newWorkshop.capacity)||20, spotsLeft: parseInt(newWorkshop.capacity)||20, times: (newWorkshop.times||[]).filter(t=>t.date), trailerUrl: newWorkshop.trailerUrl||null, gallery: [] };
                    setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,workshops:[...(p.workshops||[]),ws]}:p));
                    setNewWorkshop(null);
                    showToastMsg("Workshop added");
                  }}><I n="plus" s={14} /> Add Workshop</button>
                </div>
              </div>
            )}
          </div>
        )}

        {progSettingsTab === "bundles" && prog.model === "B" && (
          <div className="settings-section anim-fade-up">
            <h3>Bundle Pricing</h3>
            <p className="ss-sub">Offer discounts when artists book multiple workshops</p>
            {(prog.bundlePricing || []).length === 0 && !newBundle ? (
              <div style={{textAlign:"center",padding:"24px 0",color:"var(--g4)",fontSize:13}}>No bundle tiers defined yet.</div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                {(prog.bundlePricing || []).map((b, bi) => (
                  <div key={bi} style={{padding:"14px 16px",background:"var(--g1)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontWeight:600,fontSize:14}}>{b.label || `${b.minSessions}+ workshops`}</div>
                      <div style={{fontSize:13,color:"var(--g5)",marginTop:2}}>Min {b.minSessions} workshops — {b.discount}% discount</div>
                    </div>
                    <div style={{display:"flex",gap:6}}>
                      <button className="btn btn-g btn-sm" onClick={()=>setEditBundle({...b,idx:bi})}><I n="edit" s={14} /></button>
                      <button className="btn btn-danger btn-sm" onClick={()=>{
                        setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,bundlePricing:(p.bundlePricing||[]).filter((_,i)=>i!==bi)}:p));
                        showToastMsg("Bundle tier removed");
                      }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {editBundle && (
              <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Edit Bundle Tier</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div className="field"><label>Min Workshops</label><input type="number" value={editBundle.minSessions} onChange={e=>setEditBundle(b=>({...b,minSessions:parseInt(e.target.value)||0}))} /></div>
                  <div className="field"><label>Discount (%)</label><input type="number" value={editBundle.discount} onChange={e=>setEditBundle(b=>({...b,discount:parseInt(e.target.value)||0}))} /></div>
                </div>
                <div className="field"><label>Label</label><input value={editBundle.label||""} onChange={e=>setEditBundle(b=>({...b,label:e.target.value}))} placeholder="e.g. Book 3+, save 10%" /></div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button className="btn btn-s btn-sm" onClick={()=>setEditBundle(null)}>Cancel</button>
                  <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                    const {idx,...tier} = editBundle;
                    setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,bundlePricing:(p.bundlePricing||[]).map((b,i)=>i===idx?tier:b)}:p));
                    setEditBundle(null);
                    showToastMsg("Bundle tier updated");
                  }}>Save</button>
                </div>
              </div>
            )}

            {!newBundle && (
              <button className="btn btn-p btn-sm btn-press" onClick={()=>setNewBundle({minSessions:"",discount:"",label:""})}><I n="plus" s={14} /> Add Bundle Tier</button>
            )}

            {newBundle && (
              <div style={{background:"var(--sf)",borderRadius:12,border:"1px solid var(--g2)",padding:16,marginTop:16}}>
                <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Add Bundle Tier</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div className="field"><label>Min Workshops</label><input type="number" value={newBundle.minSessions} onChange={e=>setNewBundle(b=>({...b,minSessions:e.target.value}))} placeholder="3" /></div>
                  <div className="field"><label>Discount (%)</label><input type="number" value={newBundle.discount} onChange={e=>setNewBundle(b=>({...b,discount:e.target.value}))} placeholder="10" /></div>
                </div>
                <div className="field"><label>Label</label><input value={newBundle.label} onChange={e=>setNewBundle(b=>({...b,label:e.target.value}))} placeholder="e.g. Book 3+, save 10%" /></div>
                <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                  <button className="btn btn-s btn-sm" onClick={()=>setNewBundle(null)}>Cancel</button>
                  <button className="btn btn-p btn-sm btn-press" onClick={()=>{
                    if(!newBundle.minSessions) return;
                    const tier = { minSessions: parseInt(newBundle.minSessions)||0, discount: parseInt(newBundle.discount)||0, label: newBundle.label || `Book ${newBundle.minSessions}+, save ${newBundle.discount}%` };
                    setPrograms(ps=>ps.map(p=>p.id===prog.id?{...p,bundlePricing:[...(p.bundlePricing||[]),tier]}:p));
                    setNewBundle(null);
                    showToastMsg("Bundle tier added");
                  }}><I n="plus" s={14} /> Add Tier</button>
                </div>
              </div>
            )}
          </div>
        )}

        {progSettingsTab === "danger" && (
          <div className="settings-section anim-fade-up" style={{borderColor:"rgba(255,71,87,.2)"}}>
            <h3 style={{color:"var(--red)"}}>Danger Zone</h3>
            <p className="ss-sub">Irreversible actions for this program.</p>
            <div className="settings-row">
              <div>
                <div className="sr-label">Delete Program</div>
                <div className="sr-sub">Permanently remove this program and all associated data.</div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={()=>setShowConfirmDialog({
                title:"Delete Program",
                message:`Are you sure you want to delete "${prog.name}"? This cannot be undone.`,
                onConfirm:()=>{setPrograms(ps=>ps.filter(p=>p.id!==prog.id));closeProgram();showToastMsg("Program deleted");}
              })}>Delete</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // === ARTIST AUTH MODAL ===
  const renderArtistAuthModal = () => (
    <div className="overlay modal-enter" onClick={() => setShowArtistAuthModal(false)}>
      <div style={{ background: "var(--sf)", borderRadius: 20, padding: 36, maxWidth: 420, width: "95vw", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button className="btn btn-g" onClick={() => setShowArtistAuthModal(false)} style={{ position: "absolute", top: 12, right: 12 }}><I n="x" s={18} /></button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(96,77,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <I n="user" s={24} />
          </div>
          <h2 style={{ fontSize: 20, fontFamily: "var(--serif)", fontWeight: 500 }}>Sign in to Apply</h2>
          <p style={{ fontSize: 13, color: "var(--g4)", marginTop: 4 }}>You need a Lanced account to submit your application.</p>
        </div>
        <div style={{ display: "flex", background: "var(--g1)", borderRadius: 10, padding: 3, marginBottom: 20 }}>
          <button onClick={() => setArtistAuthTab("login")} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: artistAuthTab === "login" ? "var(--sf)" : "transparent", fontSize: 13, fontWeight: artistAuthTab === "login" ? 600 : 400, color: artistAuthTab === "login" ? "var(--ac)" : "var(--g5)", cursor: "pointer", fontFamily: "var(--sans)", boxShadow: artistAuthTab === "login" ? "0 1px 3px rgba(0,0,0,.08)" : "none" }}>Login</button>
          <button onClick={() => setArtistAuthTab("signup")} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: artistAuthTab === "signup" ? "var(--sf)" : "transparent", fontSize: 13, fontWeight: artistAuthTab === "signup" ? 600 : 400, color: artistAuthTab === "signup" ? "var(--ac)" : "var(--g5)", cursor: "pointer", fontFamily: "var(--sans)", boxShadow: artistAuthTab === "signup" ? "0 1px 3px rgba(0,0,0,.08)" : "none" }}>Create Account</button>
        </div>
        {artistAuthTab === "signup" && (
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Full Name</label>
            <input type="text" placeholder="Your name" value={artistAuthForm.name} onChange={e => setArtistAuthForm(f => ({ ...f, name: e.target.value }))} />
          </div>
        )}
        <div className="field" style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" value={artistAuthForm.email} onChange={e => setArtistAuthForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="field" style={{ marginBottom: 20 }}>
          <label>Password</label>
          <input type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" value={artistAuthForm.password} onChange={e => setArtistAuthForm(f => ({ ...f, password: e.target.value }))} />
        </div>
        <button className="btn btn-p btn-press" style={{ width: "100%", justifyContent: "center" }} onClick={() => {
          const name = artistAuthTab === "signup" ? artistAuthForm.name : (artistAuthForm.email.split("@")[0]);
          setArtistAuth({ name, email: artistAuthForm.email });
          setShowArtistAuthModal(false);
          setApplyStep(0);
        }}>
          {artistAuthTab === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );

  // === EDITABLE TEXT COMPONENT ===
  const EditableText = ({ id, defaultValue, tag: Tag = "span", style = {}, className = "" }) => {
    const isEditing = canvasEditMode && canvasEditTarget === id;
    const value = canvasContentOverrides[id] || defaultValue;
    if (canvasEditMode && !canvasFullscreen) return <Tag style={style} className={className}>{value}</Tag>;
    if (canvasEditMode) {
      return (
        <Tag
          style={{ ...style, cursor: "pointer", outline: isEditing ? "2px solid #604dff" : "none", outlineOffset: 4, borderRadius: 4, position: "relative" }}
          className={className}
          onClick={(e) => { e.stopPropagation(); setCanvasEditTarget(id); }}
          onMouseEnter={(e) => { if (!isEditing) e.currentTarget.style.outline = "1px dashed rgba(96,77,255,.4)"; }}
          onMouseLeave={(e) => { if (!isEditing) e.currentTarget.style.outline = "none"; }}
        >
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={value}
              onChange={e => setCanvasContentOverrides(prev => ({ ...prev, [id]: e.target.value }))}
              onBlur={() => setCanvasEditTarget(null)}
              onKeyDown={e => { if (e.key === "Enter") setCanvasEditTarget(null); }}
              style={{ ...style, background: "rgba(96,77,255,.1)", border: "1px solid #604dff", borderRadius: 4, padding: "4px 8px", width: "100%", outline: "none", color: "inherit", fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}
            />
          ) : value}
        </Tag>
      );
    }
    return <Tag style={style} className={className}>{value}</Tag>;
  };

  // === RENDER: EMBED WIDGET ===
  const renderEmbedWidget = (prog) => {
    const materials = prog.applicationForm?.materials || prog.applicationFields || [];
    const materialLabels = {
      headshot: { icon: "camera", label: "Headshot Photo" },
      dance_reel: { icon: "eye", label: "Dance Reel / Video" },
      cv: { icon: "edit", label: "CV / Resume" },
      motivation_letter: { icon: "mail", label: "Motivation Letter" },
      portfolio: { icon: "image", label: "Portfolio / Photos" },
      medical_form: { icon: "heart", label: "Medical Form" },
      references: { icon: "users", label: "References" },
      experience_level: { icon: "zap", label: "Experience Level" }
    };

    return (
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#0d0d12", color: "#fff", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        {/* Banner */}
        <div style={{ height: 140, background: prog.coverImage ? `url(${prog.coverImage}) center/cover` : (prog.bannerGradient || "linear-gradient(135deg, #1a1a2e, #604dff)"), position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(13,13,18,.9))" }} />
          <div style={{ position: "absolute", bottom: 12, left: 16, right: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{prog.name}</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{prog.location} · {formatDate(prog.startDate)} — {formatDate(prog.endDate)}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 16px", flex: 1 }}>
          {/* Price */}
          {prog.basePrice > 0 && (
            <div style={{ fontSize: 13, color: "#999", marginBottom: 16 }}>
              Starting from <span style={{ color: "#fff", fontWeight: 600, fontSize: 16 }}>{formatCurrency(prog.basePrice, prog.currency)}</span>
            </div>
          )}

          {/* What you'll need */}
          {materials.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 10 }}>WHAT YOU'LL NEED</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {materials.filter(m => typeof m === "string").map(m => {
                  const info = materialLabels[m] || { icon: "file", label: m };
                  return (
                    <div key={m} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "rgba(96,77,255,.1)", borderRadius: 8, fontSize: 12, color: "#ccc" }}>
                      <I n={info.icon} s={14} />
                      {info.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            <div style={{ padding: "10px 12px", background: "rgba(255,255,255,.04)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase" }}>CAPACITY</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{prog.capacity ? `${prog.capacity} spots` : "Open enrollment"}</div>
            </div>
            <div style={{ padding: "10px 12px", background: "rgba(255,255,255,.04)", borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, textTransform: "uppercase" }}>LEVEL</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{prog.level || "All Levels"}</div>
            </div>
          </div>

          {/* Deadline */}
          {prog.applicationDeadline && (
            <div style={{ fontSize: 12, color: "#FF4757", marginBottom: 16 }}>
              Application deadline: {formatDate(prog.applicationDeadline)}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ padding: "0 16px 16px" }}>
          <a href={`https://store.lanced.com/program/${prog.id}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#604dff", color: "#fff", textAlign: "center", padding: "14px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", cursor: "pointer" }}>
            {prog.model === "A" || prog.model === "D" ? "Apply on Lanced \u2192" : prog.model === "C" ? "Buy Tickets on Lanced \u2192" : "Register on Lanced \u2192"}
          </a>
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 16px 12px", textAlign: "center" }}>
          <span style={{ fontSize: 10, color: "#444" }}>powered by </span>
          <span style={{ fontSize: 10, color: "#604dff", fontWeight: 600 }}>Lanced</span>
        </div>
      </div>
    );
  };

  // === RENDER: EMBED CODE GENERATOR ===
  const renderEmbedCodeGenerator = (progId, showPreview) => {
    const embedSizes = { small: { w: 320, h: 480 }, medium: { w: 400, h: 520 }, large: { w: 500, h: 600 } };
    const sz = embedSizes[embedSize] || embedSizes.medium;
    const embedUrl = `https://store.lanced.com/embed/${progId}`;
    const embedCode = `<iframe src="${embedUrl}" width="${sz.w}" height="${sz.h}" frameborder="0" style="border-radius:16px;overflow:hidden;"></iframe>`;

    return (
      <div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {Object.entries(embedSizes).map(([key, val]) => (
            <button key={key} className={`chip ${embedSize === key ? "on" : ""}`} onClick={() => setEmbedSize(key)} style={{ fontSize: 11, textTransform: "capitalize" }}>
              {key} ({val.w}x{val.h})
            </button>
          ))}
        </div>
        <div style={{ background: "var(--g1)", borderRadius: 10, padding: 12, fontFamily: "var(--mono)", fontSize: 11, color: "var(--g5)", overflowX: "auto", marginBottom: 12, position: "relative" }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{embedCode}</pre>
          <button className="btn btn-p btn-sm btn-press" style={{ position: "absolute", top: 8, right: 8, fontSize: 10 }} onClick={() => { navigator.clipboard.writeText(embedCode).catch(() => {}); showToastMsg("Embed code copied!"); }}>
            <I n="copy" s={12} /> Copy
          </button>
        </div>
        {showPreview && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--g6)", marginBottom: 8 }}>Preview</div>
            <div style={{ width: sz.w, maxWidth: "100%", height: sz.h, borderRadius: 16, overflow: "hidden", border: "1px solid var(--g2)", background: "#0d0d12" }}>
              {renderEmbedWidget(programs.find(p => p.id === progId) || programs[0])}
            </div>
          </div>
        )}
      </div>
    );
  };

  // === RENDER: PUBLIC VIEW ===
  const renderPublicView = () => {
    const prog = programs.find(p => p.id === publicView);
    if (!prog) return <div style={{padding:40,textAlign:"center"}}>Program not found. <button className="btn btn-p btn-press" onClick={()=>{setPublicView(null);setArtistView(null);}}>Go Back</button></div>;

    if (artistView === "embed") return renderEmbedWidget(prog);
    if (artistView === "catalog") return renderPublicCatalog(prog);
    if (artistView === "workshop-detail") return renderPublicWorkshopDetail(prog);
    if (artistView === "cart") return renderPublicCart(prog);

    if (artistView === "apply") {
      // Model D: if artist is authenticated and accepted with pending payment, show checkout instead
      if (prog.model === "D" && artistAuth) {
        const myApp = applications.find(a => a.programId === prog.id && a.email === artistAuth.email);
        if (myApp && myApp.status === "accepted" && myApp.paymentStatus === "pending") {
          return renderPublicCheckout(prog);
        }
      }
      return renderPublicApply(prog);
    }
    if (artistView === "checkout") return renderPublicCheckout(prog);

    // Canvas-enabled public view
    if (prog.canvas?.enabled && prog.canvas?.publishedAt) {
      const cvsBg = TEMPLATE_STYLES[prog.canvas.templateId]?.bg || "#fff";
      return (
        <div>
          <style>{CSS}{`body{background:${cvsBg}!important}`}</style>
          <div style={{ minHeight: "100vh" }}>
            {renderCanvasTemplate(prog, prog.canvas.templateId, prog.canvas.sections, prog.canvas.brand)}
          </div>
          <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 100, display: "flex", gap: 8 }}>
            <button className="btn btn-g" style={{ background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", color: "#fff", border: "none", borderRadius: 50, padding: "10px 20px", fontSize: 13 }} onClick={() => { setPublicView(null); setArtistView(null); }}>
              <I n="arrowLeft" s={14} /> Back
            </button>
          </div>
          {showArtistAuthModal && renderArtistAuthModal()}
        </div>
      );
    }

    return (
      <div className={darkMode ? "dark" : ""}>
        <style>{CSS}</style>
        <div className="public-program">
          <div className={`public-banner ${prog.type}`}>
            <h1>{prog.name}</h1>
            <div className="pub-org">by {MOCK_ORG.name}</div>
          </div>
          <div className="public-details">
            <h3>About</h3>
            <p>{prog.description}</p>
            <div className="pub-info-grid">
              <div className="pub-info-item"><I n="calendar" s={16} /> <strong>Dates:</strong> {formatDate(prog.startDate)} - {formatDate(prog.endDate)}</div>
              <div className="pub-info-item"><I n="mapPin" s={16} /> <strong>Location:</strong> {prog.location}</div>
              <div className="pub-info-item"><I n="users" s={16} /> <strong>Capacity:</strong> {prog.capacity ? `${prog.capacity} spots` : "Open enrollment"}</div>
              {prog.basePrice && <div className="pub-info-item"><I n="dollar" s={16} /> <strong>Price:</strong> {formatCurrency(prog.basePrice, prog.currency)}</div>}
              {prog.level && <div className="pub-info-item"><I n="award" s={16} /> <strong>Level:</strong> {prog.level}</div>}
              {prog.styles && prog.styles.length > 0 && <div className="pub-info-item"><I n="tag" s={16} /> <strong>Styles:</strong> {prog.styles.join(", ")}</div>}
            </div>
            {prog.applicationDeadline && (
              <div style={{marginTop:16,padding:12,background:"rgba(96,77,255,.06)",borderRadius:10,fontSize:13,color:"var(--ac)",fontWeight:500}}>
                <I n="clock" s={14} /> Application deadline: {formatDate(prog.applicationDeadline)}
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:12,marginTop:16}}>
            {["A","D"].includes(prog.model) ? (
              <button className="btn btn-p btn-lg btn-press" style={{flex:1,justifyContent:"center"}} onClick={()=>{if(!artistAuth){setShowArtistAuthModal(true);return;}setArtistView("apply");setApplySubmitted(false);setApplyForm({name:artistAuth.name,email:artistAuth.email,age:"",nationality:"",location:"",motivation:"",experience:""});setApplyStep(0);}}>
                <I n="edit" s={18} /> {({ A: "Apply Now", D: "Apply" })[prog.model]}
              </button>
            ) : prog.model === "B" ? (
              <button className="btn btn-p btn-lg btn-press" style={{flex:1,justifyContent:"center"}} onClick={()=>{setArtistView("catalog");}}>
                <I n="grid" s={18} /> Browse Workshops
              </button>
            ) : (
              <button className="btn btn-p btn-lg btn-press" style={{flex:1,justifyContent:"center"}} onClick={()=>{if(!artistAuth){setShowArtistAuthModal(true);return;}setArtistView("checkout");setCheckoutQty(1);setCheckoutComplete(false);setCheckoutProcessing(false);}}>
                <I n="ticket" s={18} /> Buy Tickets
              </button>
            )}
          </div>
          <div style={{textAlign:"center",marginTop:24}}>
            <button className="btn btn-g" onClick={()=>{setPublicView(null);setArtistView(null);}}>
              <I n="arrowLeft" s={14} /> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };

  // === PUBLIC: WORKSHOP CATALOG ===
  const renderPublicCatalog = (prog) => {
    const workshops = prog.workshops || [];
    const filtered = workshops.filter(ws => {
      if (workshopFilter.style !== "all" && !ws.styles.includes(workshopFilter.style)) return false;
      if (workshopFilter.level !== "all" && ws.level !== workshopFilter.level) return false;
      return true;
    });
    const allStyles = [...new Set(workshops.flatMap(w => w.styles))];
    const allLevels = [...new Set(workshops.map(w => w.level))];
    const cartTotal = workshopCart.reduce((sum, wsId) => {
      const ws = workshops.find(w => w.id === wsId);
      return sum + (ws?.price || 0);
    }, 0);
    const bundleDiscount = (prog.bundlePricing || [])
      .filter(b => workshopCart.length >= b.minSessions)
      .reduce((max, b) => Math.max(max, b.discount), 0);
    const discountedTotal = cartTotal * (1 - bundleDiscount / 100);

    return (
      <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff", padding: "0 0 100px" }}>
        {/* Back button */}
        <div style={{ padding: "20px 32px" }}>
          <button onClick={() => setArtistView(null)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 14 }}>&larr; Back to Program</button>
        </div>

        {/* Header */}
        <div style={{ padding: "0 32px 32px", maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 300, margin: "0 0 8px" }}>{prog.name}</h1>
          <p style={{ color: "#999", fontSize: 14, margin: 0 }}>{prog.location} &middot; {formatDate(prog.startDate)} &mdash; {formatDate(prog.endDate)}</p>
        </div>

        {/* Bundle pricing banner */}
        {(prog.bundlePricing || []).length > 0 && (
          <div style={{ margin: "0 32px 24px", maxWidth: 1200, marginLeft: "auto", marginRight: "auto", padding: "16px 24px", background: "linear-gradient(135deg, rgba(96,77,255,.15), rgba(156,39,176,.15))", borderRadius: 12, border: "1px solid rgba(96,77,255,.3)", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <I n="zap" s={18} />
            {prog.bundlePricing.map((b, i) => (
              <span key={i} style={{ fontSize: 13, color: "#ccc" }}>{b.label}</span>
            ))}
          </div>
        )}

        {/* Filter bar */}
        <div style={{ padding: "0 32px 24px", maxWidth: 1200, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#666", letterSpacing: 2, textTransform: "uppercase" }}>Filter:</span>
          <select value={workshopFilter.style} onChange={e => setWorkshopFilter(f => ({...f, style: e.target.value}))} style={{ background: "#1a1a2e", color: "#fff", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
            <option value="all">All Styles</option>
            {allStyles.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={workshopFilter.level} onChange={e => setWorkshopFilter(f => ({...f, level: e.target.value}))} style={{ background: "#1a1a2e", color: "#fff", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 13 }}>
            <option value="all">All Levels</option>
            {allLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <span style={{ marginLeft: "auto", fontSize: 13, color: "#999" }}>{filtered.length} workshop{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Workshop grid */}
        <div style={{ padding: "0 32px", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {filtered.map(ws => {
            const inCart = workshopCart.includes(ws.id);
            return (
              <div key={ws.id} style={{ borderRadius: 16, overflow: "hidden", background: "#1a1a2e", border: inCart ? "2px solid #604dff" : "1px solid #2a2a3e", transition: "all .2s", cursor: "pointer" }}>
                {/* Image */}
                <div onClick={() => { setSelectedWorkshop(ws); setArtistView("workshop-detail"); }} style={{ height: 180, background: ws.image ? `url(${ws.image}) center/cover` : "linear-gradient(135deg, #1a1a2e, #2a2a3e)", position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 6 }}>
                    {ws.styles.map(s => <span key={s} style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 20, fontSize: 11, color: "#fff" }}>{s}</span>)}
                  </div>
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", padding: "4px 10px", borderRadius: 20, fontSize: 11, color: ws.spotsLeft < 5 ? "#FF4757" : "#ccc" }}>{ws.spotsLeft} spots left</div>
                </div>
                {/* Content */}
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <img src={ws.teacher.photo} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
                    <span style={{ fontSize: 12, color: "#999" }}>{ws.teacher.name}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#666", background: "#0d0d12", padding: "3px 8px", borderRadius: 6 }}>{ws.level}</span>
                  </div>
                  <h3 onClick={() => { setSelectedWorkshop(ws); setArtistView("workshop-detail"); }} style={{ fontSize: 17, fontWeight: 600, margin: "0 0 8px", cursor: "pointer" }}>{ws.title}</h3>
                  <p style={{ fontSize: 13, color: "#888", margin: "0 0 12px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ws.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 12, color: "#888" }}>
                    <I n="calendar" s={14} />
                    <span>{ws.times.map(t => formatDate(t.date)).join(", ")}</span>
                    <span>&middot;</span>
                    <span>{ws.times[0]?.startTime} &ndash; {ws.times[ws.times.length-1]?.endTime}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>&euro;{ws.price}</span>
                    <button onClick={(e) => { e.stopPropagation(); if (inCart) { setWorkshopCart(c => c.filter(id => id !== ws.id)); } else { setWorkshopCart(c => [...c, ws.id]); } }} style={{ background: inCart ? "#604dff" : "transparent", color: inCart ? "#fff" : "#604dff", border: "1px solid #604dff", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>
                      {inCart ? "\u2713 In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating cart bar */}
        {workshopCart.length > 0 && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(13,13,18,.95)", backdropFilter: "blur(20px)", borderTop: "1px solid #2a2a3e", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, zIndex: 1000 }}>
            <span style={{ fontSize: 14, color: "#ccc" }}>{workshopCart.length} workshop{workshopCart.length !== 1 ? "s" : ""}</span>
            {bundleDiscount > 0 && <span style={{ fontSize: 12, color: "#604dff", background: "rgba(96,77,255,.1)", padding: "4px 12px", borderRadius: 20 }}>-{bundleDiscount}% bundle discount</span>}
            <span style={{ fontSize: 18, fontWeight: 700 }}>&euro;{discountedTotal.toFixed(2)}</span>
            <button onClick={() => setArtistView("cart")} style={{ background: "#604dff", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>View Cart &rarr;</button>
          </div>
        )}
      </div>
    );
  };

  // === PUBLIC: WORKSHOP DETAIL ===
  const renderPublicWorkshopDetail = (prog) => {
    const ws = selectedWorkshop;
    if (!ws) return null;
    const inCart = workshopCart.includes(ws.id);

    return (
      <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff" }}>
        {/* Back button */}
        <div style={{ padding: "20px 32px" }}>
          <button onClick={() => setArtistView("catalog")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 14 }}>&larr; Back to Workshops</button>
        </div>

        {/* Hero image */}
        <div style={{ height: 360, background: ws.image ? `url(${ws.image}) center/cover` : "linear-gradient(135deg, #1a1a2e, #2a2a3e)", position: "relative" }}>
          {ws.trailerUrl && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(96,77,255,.9)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <I n="eye" s={24} />
              </div>
            </div>
          )}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, #0d0d12)" }} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 80px" }}>
          {/* Title + meta */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {ws.styles.map(s => <span key={s} style={{ background: "rgba(96,77,255,.15)", color: "#604dff", padding: "4px 12px", borderRadius: 20, fontSize: 12 }}>{s}</span>)}
            <span style={{ background: "rgba(255,255,255,.06)", color: "#999", padding: "4px 12px", borderRadius: 20, fontSize: 12 }}>{ws.level}</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 300, margin: "0 0 24px" }}>{ws.title}</h1>

          {/* Teacher card */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, background: "#1a1a2e", borderRadius: 16, marginBottom: 32, border: "1px solid #2a2a3e" }}>
            <img src={ws.teacher.photo} alt="" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{ws.teacher.name}</div>
              <div style={{ fontSize: 13, color: "#999", lineHeight: 1.5 }}>{ws.teacher.bio}</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ fontSize: 15, color: "#ccc", lineHeight: 1.8, marginBottom: 32 }}>{ws.description}</div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            <div style={{ padding: 20, background: "#1a1a2e", borderRadius: 12, border: "1px solid #2a2a3e" }}>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>SCHEDULE</div>
              {ws.times.map((t, i) => (
                <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 4 }}>{formatDate(t.date)} &middot; {t.startTime} &ndash; {t.endTime}</div>
              ))}
            </div>
            <div style={{ padding: 20, background: "#1a1a2e", borderRadius: 12, border: "1px solid #2a2a3e" }}>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>LOCATION</div>
              <div style={{ fontSize: 14, color: "#ccc" }}>{ws.location}</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{prog.location}</div>
            </div>
            <div style={{ padding: 20, background: "#1a1a2e", borderRadius: 12, border: "1px solid #2a2a3e" }}>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>CAPACITY</div>
              <div style={{ fontSize: 14, color: "#ccc" }}>{ws.spotsLeft} of {ws.capacity} spots remaining</div>
              <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: "rgba(255,255,255,.08)" }}>
                <div style={{ height: "100%", borderRadius: 2, background: ws.spotsLeft < 5 ? "#FF4757" : "#604dff", width: `${((ws.capacity - ws.spotsLeft) / ws.capacity) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 24, background: "#1a1a2e", borderRadius: 16, border: "1px solid #2a2a3e" }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700 }}>&euro;{ws.price}</div>
              <div style={{ fontSize: 13, color: "#888" }}>{ws.times.length} session{ws.times.length > 1 ? "s" : ""}</div>
            </div>
            <button onClick={() => { if (inCart) { setWorkshopCart(c => c.filter(id => id !== ws.id)); } else { setWorkshopCart(c => [...c, ws.id]); } }} style={{ flex: 1, background: inCart ? "transparent" : "#604dff", color: inCart ? "#604dff" : "#fff", border: inCart ? "1px solid #604dff" : "none", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", textAlign: "center" }}>
              {inCart ? "\u2713 Added to Cart \u2014 Remove" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Floating cart bar */}
        {workshopCart.length > 0 && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(13,13,18,.95)", backdropFilter: "blur(20px)", borderTop: "1px solid #2a2a3e", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "center", gap: 24, zIndex: 1000 }}>
            <span style={{ fontSize: 14, color: "#ccc" }}>{workshopCart.length} workshop{workshopCart.length !== 1 ? "s" : ""}</span>
            <button onClick={() => setArtistView("cart")} style={{ background: "#604dff", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>View Cart &rarr;</button>
          </div>
        )}
      </div>
    );
  };

  // === PUBLIC: WORKSHOP CART ===
  const renderPublicCart = (prog) => {
    const workshops = prog.workshops || [];
    const cartWorkshops = workshops.filter(w => workshopCart.includes(w.id));
    const subtotal = cartWorkshops.reduce((s, w) => s + w.price, 0);
    const bundleDiscount = (prog.bundlePricing || [])
      .filter(b => workshopCart.length >= b.minSessions)
      .reduce((max, b) => Math.max(max, b.discount), 0);
    const discountAmount = subtotal * bundleDiscount / 100;
    const total = subtotal - discountAmount;

    if (cartCheckoutComplete) {
      return (
        <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: 500 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#127881;</div>
            <h2 style={{ fontSize: 28, fontWeight: 300, marginBottom: 12 }}>Booking Confirmed!</h2>
            <p style={{ color: "#999", marginBottom: 24 }}>You've booked {cartWorkshops.length} workshops. Check your email for confirmation details.</p>
            <div style={{ background: "#1a1a2e", padding: 16, borderRadius: 12, marginBottom: 24, border: "1px solid #2a2a3e" }}>
              <div style={{ fontSize: 12, color: "#666", letterSpacing: 2, marginBottom: 8 }}>BOOKING CODE</div>
              <div style={{ fontSize: 20, fontFamily: "monospace", color: "#604dff" }}>WB-{Date.now().toString(36).toUpperCase()}</div>
            </div>
            <button onClick={() => { setArtistView(null); setWorkshopCart([]); setCartCheckoutComplete(false); }} style={{ background: "#604dff", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Back to Program</button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff", padding: "20px 0" }}>
        {/* Back */}
        <div style={{ padding: "0 32px 20px" }}>
          <button onClick={() => setArtistView("catalog")} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: 14 }}>&larr; Back to Workshops</button>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 32 }}>Your Cart</h1>

          {/* Cart items */}
          {cartWorkshops.map(ws => (
            <div key={ws.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: "#1a1a2e", borderRadius: 12, marginBottom: 12, border: "1px solid #2a2a3e" }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, background: ws.image ? `url(${ws.image}) center/cover` : "#2a2a3e", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{ws.title}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{ws.teacher.name} &middot; {ws.times.map(t => formatDate(t.date)).join(", ")}</div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, flexShrink: 0 }}>&euro;{ws.price}</div>
              <button onClick={() => setWorkshopCart(c => c.filter(id => id !== ws.id))} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 18, padding: 4 }}>&times;</button>
            </div>
          ))}

          {cartWorkshops.length === 0 && (
            <div style={{ textAlign: "center", padding: 60, color: "#666" }}>
              <p>Your cart is empty</p>
              <button onClick={() => setArtistView("catalog")} style={{ background: "#604dff", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, marginTop: 16, cursor: "pointer" }}>Browse Workshops</button>
            </div>
          )}

          {cartWorkshops.length > 0 && (
            <>
              {/* Summary */}
              <div style={{ padding: 24, background: "#1a1a2e", borderRadius: 16, marginTop: 24, border: "1px solid #2a2a3e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "#ccc" }}>
                  <span>Subtotal ({cartWorkshops.length} workshops)</span>
                  <span>&euro;{subtotal.toFixed(2)}</span>
                </div>
                {bundleDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "#604dff" }}>
                    <span>Bundle Discount (-{bundleDiscount}%)</span>
                    <span>-&euro;{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ borderTop: "1px solid #2a2a3e", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700 }}>
                  <span>Total</span>
                  <span>&euro;{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment stub */}
              <div style={{ padding: 24, background: "#1a1a2e", borderRadius: 16, marginTop: 16, border: "1px solid #2a2a3e" }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Payment Details</div>
                <div style={{ display: "grid", gap: 12 }}>
                  <input placeholder="Card number" value="4242 4242 4242 4242" readOnly style={{ background: "#0d0d12", border: "1px solid #333", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input placeholder="MM/YY" value="12/28" readOnly style={{ background: "#0d0d12", border: "1px solid #333", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14 }} />
                    <input placeholder="CVC" value="123" readOnly style={{ background: "#0d0d12", border: "1px solid #333", borderRadius: 8, padding: "12px 16px", color: "#fff", fontSize: 14 }} />
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <button
                disabled={cartCheckoutProcessing}
                onClick={async () => {
                  if (!artistAuth) { setShowArtistAuthModal(true); return; }
                  setCartCheckoutProcessing(true);
                  await new Promise(r => setTimeout(r, 1500));
                  const booking = {
                    id: "wb" + Date.now(),
                    programId: prog.id,
                    workshopIds: [...workshopCart],
                    buyerName: artistAuth.name,
                    buyerEmail: artistAuth.email,
                    totalAmount: subtotal,
                    discountApplied: bundleDiscount,
                    finalAmount: total,
                    status: "confirmed",
                    purchasedAt: new Date().toISOString(),
                    bookingCode: "WB-" + Date.now().toString(36).toUpperCase()
                  };
                  setWorkshopBookings(prev => [...prev, booking]);
                  setCartCheckoutProcessing(false);
                  setCartCheckoutComplete(true);
                }}
                style={{ width: "100%", marginTop: 16, background: cartCheckoutProcessing ? "#444" : "#604dff", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: cartCheckoutProcessing ? "default" : "pointer" }}
              >
                {cartCheckoutProcessing ? "Processing..." : `Complete Booking \u2014 \u20AC${total.toFixed(2)}`}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // === PUBLIC: APPLY ===
  const renderPublicApply = (prog) => {
    const config = prog.applicationConfig || {};
    const materials = (config.materials || prog.applicationFields || []);
    const customQs = config.customQuestions || [];

    if (applySubmitted) {
      return (
        <div className={darkMode ? "dark" : ""}>
          <style>{CSS}</style>
          <div className="confirm-page">
            <div className="confirm-icon"><I n="check" s={32} /></div>
            <h2>Application Submitted!</h2>
            <div className="confirm-sub">Thank you for applying to {prog.name}. We will review your application and get back to you shortly.</div>
            <button className="btn btn-p btn-press" onClick={()=>{setPublicView(null);setArtistView(null);}}>Back to Dashboard</button>
          </div>
        </div>
      );
    }

    return (
      <div className={darkMode ? "dark" : ""}>
        <style>{CSS}</style>
        <div style={{ minHeight: "100vh", background: "#0d0d12", color: "#fff" }}>
          {/* Program Banner Header */}
          <div style={{ height: 200, background: prog.coverImage ? `url(${prog.coverImage}) center/cover` : (prog.bannerGradient || "linear-gradient(135deg, #1a1a2e, #604dff)"), position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(13,13,18,.95))" }} />
            <div style={{ position: "absolute", bottom: 24, left: 32, right: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#604dff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>{MOCK_ORG.name.charAt(0)}</div>
                <span style={{ fontSize: 13, color: "#999" }}>{MOCK_ORG.name}</span>
              </div>
              <h1 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 300, margin: 0 }}>Apply to {prog.name}</h1>
            </div>
          </div>

          {/* Back button */}
          <div style={{ padding: "16px 32px 0" }}>
            <button onClick={() => { setArtistView(null); }} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 13 }}>{"\u2190"} Back to Program</button>
          </div>

          {/* Form Card */}
          <div className="anim-fade-up" style={{ maxWidth: 640, margin: "24px auto", padding: "0 24px 60px" }}>

            {/* Profile check - signed-in card */}
            {artistAuth && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, background: "rgba(29,185,84,.08)", border: "1px solid rgba(29,185,84,.2)", borderRadius: 12, marginBottom: 24 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#604dff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600 }}>{artistAuth.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{artistAuth.name}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{artistAuth.email}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#1DB954", fontSize: 12 }}>{"\u2713"} Signed in</div>
              </div>
            )}

            {/* Materials Upload Section */}
            {materials.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Required Materials</h3>
                <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Upload the following materials with your application</p>

                {materials.map((matId) => {
                  const matInfo = STANDARD_MATERIALS.find(m => m.id === matId) || { id: matId, label: matId.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) };
                  const isUploaded = applyForm[matId + "_uploaded"];

                  return (
                    <div key={matId} style={{
                      marginBottom: 16, padding: 20, borderRadius: 12,
                      background: isUploaded ? "rgba(29,185,84,.06)" : "#1a1a2e",
                      border: isUploaded ? "1px solid rgba(29,185,84,.2)" : "1px solid #2a2a3e",
                      transition: "all .3s"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isUploaded ? 0 : 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: isUploaded ? "rgba(29,185,84,.15)" : "rgba(96,77,255,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {isUploaded ? <span style={{ color: "#1DB954" }}>{"\u2713"}</span> : <I n={matId.includes("video") || matId.includes("reel") ? "video" : matId.includes("photo") || matId.includes("headshot") ? "camera" : "file"} s={16} />}
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 500 }}>{matInfo.label}</div>
                            {matInfo.desc && <div style={{ fontSize: 11, color: "#666" }}>{matInfo.desc}</div>}
                          </div>
                        </div>
                        {isUploaded && <span style={{ fontSize: 11, color: "#1DB954", fontWeight: 600 }}>Upload Complete</span>}
                      </div>

                      {!isUploaded && (
                        <div style={{ marginTop: 8 }}>
                          <div
                            onClick={() => setApplyForm(f => ({...f, [matId + "_uploaded"]: true, [matId + "_file"]: "sample_" + matId + ".mp4" }))}
                            style={{
                              border: "2px dashed #333", borderRadius: 10, padding: "28px 20px",
                              textAlign: "center", cursor: "pointer", transition: "all .2s",
                              background: "rgba(255,255,255,.01)"
                            }}
                          >
                            <I n="upload" s={24} />
                            <div style={{ fontSize: 13, color: "#ccc", marginBottom: 4, marginTop: 8 }}>
                              {matId.includes("video") || matId.includes("reel") ? "Upload video or paste link" : "Click to upload or drag & drop"}
                            </div>
                            <div style={{ fontSize: 11, color: "#666" }}>
                              {matId.includes("video") || matId.includes("reel") ? "MP4, MOV — max 100MB" : "JPG, PNG, PDF — max 10MB"}
                            </div>
                          </div>
                          <div style={{ textAlign: "center", marginTop: 8 }}>
                            <span style={{ fontSize: 11, color: "#666" }}>or</span>
                            <button onClick={() => setApplyForm(f => ({...f, [matId + "_uploaded"]: true, [matId + "_file"]: "library_" + matId }))} style={{ background: "none", border: "none", color: "#604dff", fontSize: 12, cursor: "pointer", marginLeft: 4 }}>Select from Media Library</button>
                          </div>
                        </div>
                      )}

                      {/* Preview after upload */}
                      {isUploaded && (matId.includes("video") || matId.includes("reel")) && (
                        <div style={{ marginTop: 12, borderRadius: 8, overflow: "hidden", background: "#0d0d12", height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(96,77,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontSize: 18 }}>{"\u25B6"}</div>
                            <div style={{ fontSize: 12, color: "#888" }}>Video uploaded successfully</div>
                          </div>
                        </div>
                      )}
                      {isUploaded && (matId.includes("headshot") || matId.includes("photo") || matId.includes("portfolio")) && (
                        <div style={{ marginTop: 12, borderRadius: 8, overflow: "hidden", height: 120, background: "linear-gradient(135deg, #2a2a3e, #1a1a2e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <I n="image" s={32} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Motivation / Experience text areas */}
            {(materials.includes("motivation_letter") || materials.includes("cv")) && (
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
                  {materials.includes("motivation_letter") ? "Motivation Letter" : "Dance Experience"}
                </label>
                <textarea
                  value={applyForm.motivation}
                  onChange={e => setApplyForm(f => ({...f, motivation: e.target.value}))}
                  placeholder="Why do you want to participate?"
                  rows={4}
                  style={{ width: "100%", background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: 10, padding: 14, color: "#fff", fontSize: 14, resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
            )}

            {/* Custom Questions */}
            {customQs.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Additional Questions</h3>
                {customQs.map(q => (
                  <div key={q.id} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
                      {q.label} {q.required && <span style={{ color: "#FF4757" }}>*</span>}
                    </label>
                    {q.type === "textarea" ? (
                      <textarea rows={3} placeholder={q.placeholder || ""} style={{ width: "100%", background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: 10, padding: 14, color: "#fff", fontSize: 14, fontFamily: "inherit" }} />
                    ) : q.type === "select" || q.type === "radio" ? (
                      <select style={{ width: "100%", background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: 10, padding: 14, color: "#fff", fontSize: 14 }}>
                        <option value="">Select...</option>
                        {(q.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={q.type === "number" ? "number" : "text"} placeholder={q.placeholder || ""} style={{ width: "100%", background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: 10, padding: 14, color: "#fff", fontSize: 14 }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Application fee notice */}
            {prog.applicationFee > 0 && (
              <div style={{ padding: 16, background: "rgba(96,77,255,.06)", borderRadius: 12, border: "1px solid rgba(96,77,255,.15)", marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 13, color: "#ccc" }}>Application fee: <strong>{formatCurrency(prog.applicationFee, prog.currency)}</strong></div>
              </div>
            )}

            {/* Submit */}
            <button className="btn-press" onClick={submitApplication} style={{ width: "100%", background: "#604dff", color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>
              Submit Application
            </button>
          </div>
        </div>
      </div>
    );
  };

  // === PUBLIC: CHECKOUT ===
  const renderPublicCheckout = (prog) => {
    if (checkoutComplete) {
      const lastTicket = tickets[tickets.length - 1];
      return (
        <div className={darkMode ? "dark" : ""}>
          <style>{CSS}</style>
          <div className="confirm-page">
            <div className="confirm-icon"><I n="check" s={32} /></div>
            <h2>Tickets Purchased!</h2>
            <div className="confirm-sub">Your tickets for {prog.name} are confirmed.</div>
            {lastTicket && <div style={{fontFamily:"var(--mono)",fontSize:18,fontWeight:700,color:"var(--ac)",marginBottom:24}}>Ticket Code: {lastTicket.ticketCode}</div>}
            <button className="btn btn-p btn-press" onClick={()=>{setPublicView(null);setArtistView(null);}}>Back to Dashboard</button>
          </div>
        </div>
      );
    }

    const unitPrice = prog.basePrice || 0;
    const total = unitPrice * checkoutQty;

    return (
      <div className={darkMode ? "dark" : ""}>
        <style>{CSS}</style>
        <div className="checkout-page">
          <div style={{marginBottom:24}}>
            <button className="btn btn-g" onClick={()=>setArtistView(null)}><I n="arrowLeft" s={14} /> Back to Program</button>
          </div>
          <div className="checkout-card">
            <h2 style={{fontFamily:"var(--serif)",fontSize:22,fontWeight:400,marginBottom:20}}>Checkout</h2>
            <div className="checkout-summary">
              <h3>{prog.name}</h3>
              <div className="checkout-row"><span className="cr-label">Price per ticket</span><span className="cr-value">{formatCurrency(unitPrice, prog.currency)}</span></div>
              <div className="checkout-row">
                <span className="cr-label">Quantity</span>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button className="btn btn-s btn-sm" onClick={()=>setCheckoutQty(Math.max(1,checkoutQty-1))}>-</button>
                  <span style={{fontFamily:"var(--mono)",fontWeight:600,minWidth:24,textAlign:"center"}}>{checkoutQty}</span>
                  <button className="btn btn-s btn-sm" onClick={()=>setCheckoutQty(checkoutQty+1)}>+</button>
                </div>
              </div>
              <div className="checkout-row total"><span className="cr-label">Total</span><span className="cr-value">{formatCurrency(total, prog.currency)}</span></div>
            </div>
            <div className="stripe-stub">
              <div className="ss-title"><I n="creditCard" s={16} /> Payment Details</div>
              <div className="stripe-field">4242 4242 4242 4242</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div className="stripe-field">12 / 28</div>
                <div className="stripe-field">123</div>
              </div>
            </div>
            <button className="btn btn-p btn-lg btn-press" style={{width:"100%",justifyContent:"center"}} onClick={purchaseTicket} disabled={checkoutProcessing}>
              {checkoutProcessing ? "Processing..." : `Pay ${formatCurrency(total, prog.currency)}`}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // === MODALS ===

  const renderNewProgramModal = () => (
    <div className="overlay modal-enter" onClick={()=>setShowNewProgram(false)}>
      <div className="new-prog-modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <h2>Create New Program</h2>
          <button className="btn btn-g" onClick={()=>setShowNewProgram(false)}><I n="x" s={18} /></button>
        </div>
        <div className="npm-sub">Choose a model and fill in the details</div>
        <div className="model-select" style={{gridTemplateColumns:"repeat(2, 1fr)"}}>
          <div className={`model-option ${newProg.model==="A"?"selected":""}`} onClick={()=>setNewProg(p=>({...p,model:"A"}))}>
            <div className="mo-icon">🎯</div>
            <div className="mo-title">Intensive / Educational</div>
            <div className="mo-desc">Full program with optional selection, groups, multi-week support, and scholarships</div>
          </div>
          <div className={`model-option ${newProg.model==="B"?"selected":""}`} onClick={()=>setNewProg(p=>({...p,model:"B"}))}>
            <div className="mo-icon">🧩</div>
            <div className="mo-title">Modular Intensive</div>
            <div className="mo-desc">Artists pick workshops from a catalog to build their own schedule</div>
          </div>
          <div className={`model-option ${newProg.model==="C"?"selected":""}`} onClick={()=>setNewProg(p=>({...p,model:"C"}))}>
            <div className="mo-icon">🎟️</div>
            <div className="mo-title">Direct Ticketing</div>
            <div className="mo-desc">Sell tickets directly. No application required</div>
          </div>
          <div className={`model-option ${newProg.model==="D"?"selected":""}`} onClick={()=>setNewProg(p=>({...p,model:"D"}))}>
            <div className="mo-icon">🛡️</div>
            <div className="mo-title">Curated Workshop</div>
            <div className="mo-desc">Quick registration with approval before payment</div>
          </div>
        </div>
        <div className="field"><label>Program Name *</label><input value={newProg.name} onChange={e=>setNewProg(p=>({...p,name:e.target.value}))} placeholder="e.g. Summer Intensive 2026" /></div>
        <div className="field"><label>Description</label><textarea value={newProg.description} onChange={e=>setNewProg(p=>({...p,description:e.target.value}))} placeholder="Describe your program..." /></div>
        {newProg.model === "C" && (
          <div className="field">
            <label>Type</label>
            <select value={newProg.type} onChange={e=>setNewProg(p=>({...p,type:e.target.value}))}>
              <option value="workshop">Workshop</option>
              <option value="masterclass">Masterclass</option>
              <option value="intensive">Intensive</option>
            </select>
          </div>
        )}
        <div className="field-row">
          <div className="field"><label>Location</label><input value={newProg.location} onChange={e=>setNewProg(p=>({...p,location:e.target.value}))} placeholder="City, Country" /></div>
          <div className="field"><label>Venue</label><input value={newProg.venue} onChange={e=>setNewProg(p=>({...p,venue:e.target.value}))} placeholder="Venue name" /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Start Date</label><input type="date" value={newProg.startDate} onChange={e=>setNewProg(p=>({...p,startDate:e.target.value}))} /></div>
          <div className="field"><label>End Date</label><input type="date" value={newProg.endDate} onChange={e=>setNewProg(p=>({...p,endDate:e.target.value}))} /></div>
        </div>
        {["A","D"].includes(newProg.model) && (
          <div className="field-row">
            <div className="field"><label>Application Deadline</label><input type="date" value={newProg.applicationDeadline} onChange={e=>setNewProg(p=>({...p,applicationDeadline:e.target.value}))} /></div>
            <div className="field"><label>Confirmation Deadline</label><input type="date" value={newProg.confirmationDeadline} onChange={e=>setNewProg(p=>({...p,confirmationDeadline:e.target.value}))} /></div>
          </div>
        )}
        <div className="field-row-3">
          <div className="field"><label>Capacity</label><input type="number" value={newProg.capacity || ""} onChange={e=>setNewProg(p=>({...p,capacity:e.target.value===""?0:parseInt(e.target.value)||0}))} placeholder="Leave empty for unlimited" /><div style={{fontSize:11,color:"var(--g4)",marginTop:4}}>Leave empty if spots are unlimited or not applicable</div></div>
          <div className="field"><label>Price ({newProg.currency})</label><input type="number" value={newProg.basePrice} onChange={e=>setNewProg(p=>({...p,basePrice:e.target.value}))} placeholder="0" /></div>
          <div className="field">
            <label>Currency</label>
            <select value={newProg.currency} onChange={e=>setNewProg(p=>({...p,currency:e.target.value}))}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:16}}>
          <button className="btn btn-s" onClick={()=>setShowNewProgram(false)}>Cancel</button>
          <button className="btn btn-p btn-press" onClick={createProgram}><I n="plus" s={14} /> Create Program</button>
        </div>
      </div>
    </div>
  );

  const renderShareModal = () => {
    const shareUrl = `https://store.lanced.com/p/${viewProgram?.id || "demo"}`;
    return (
      <div className="overlay modal-enter" onClick={()=>{setShowShareModal(false);setShareTab("link");}}>
        <div className="share-modal" onClick={e=>e.stopPropagation()} style={{ maxWidth: 560 }}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <h2 style={{fontFamily:"var(--serif)",fontSize:22,fontWeight:400}}>Share Program</h2>
            <button className="btn btn-g" onClick={()=>{setShowShareModal(false);setShareTab("link");}}><I n="x" s={18} /></button>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:16}}>
            <button className={`chip ${shareTab === "link" ? "on" : ""}`} onClick={() => setShareTab("link")}><I n="link" s={12} /> Link</button>
            <button className={`chip ${shareTab === "embed" ? "on" : ""}`} onClick={() => setShareTab("embed")}><I n="code" s={12} /> Embed</button>
          </div>
          {shareTab === "link" && (
            <div>
              <div style={{fontSize:13,color:"var(--g5)",marginBottom:12}}>Share this link with artists to view and apply to your program.</div>
              <div className="share-link-box">
                <input readOnly value={shareUrl} />
                <button className="btn btn-p btn-sm btn-press" onClick={()=>{navigator.clipboard.writeText(shareUrl).catch(()=>{});setToast("Link copied!");}}><I n="copy" s={14} /> Copy</button>
              </div>
            </div>
          )}
          {shareTab === "embed" && (
            <div>
              <div style={{fontSize:13,color:"var(--g5)",marginBottom:12}}>Embed a promotional card on your website.</div>
              {renderEmbedCodeGenerator(viewProgram?.id || "demo", true)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderApplicantDetailModal = () => {
    const app = showApplicantDetail;
    if (!app) return null;
    const prog = programs.find(p => p.id === app.programId);
    return (
      <div className="overlay modal-enter" onClick={()=>setShowApplicantDetail(null)}>
        <div className="app-detail" onClick={e=>e.stopPropagation()}>
          <div className="app-detail-header">
            <div className="app-detail-avatar">{app.headshot ? <img src={app.headshot} alt="" style={{width:80,height:80,borderRadius:16,objectFit:"cover"}} /> : getInitials(app.name)}</div>
            <div className="app-detail-info">
              <h2>{app.name}</h2>
              <div className="app-detail-meta">
                {app.age && <span><I n="user" s={13} /> {app.age} years old</span>}
                {app.nationality && <span><I n="globe" s={13} /> {app.nationality}</span>}
                {app.location && <span><I n="mapPin" s={13} /> {app.location}</span>}
                <span><I n="mail" s={13} /> {app.email}</span>
              </div>
              <div style={{marginTop:8}}>
                <span className={`app-badge ${app.status}`}>{statusLabel(app.status)}</span>
                {prog?.model === "D" && app.status === "accepted" && (
                  <span style={{marginLeft:8,padding:"3px 10px",borderRadius:50,fontSize:11,fontWeight:600,background:app.paymentStatus === "paid" ? "rgba(29,185,84,.12)" : "rgba(245,166,35,.12)",color:app.paymentStatus === "paid" ? "var(--green)" : "var(--amber)"}}>{app.paymentStatus === "paid" ? "Paid" : "Payment Pending"}</span>
                )}
              </div>
            </div>
            <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>setShowApplicantDetail(null)}><I n="x" s={18} /></button>
          </div>
          <div className="app-detail-body">
            {app.motivation && (
              <div className="app-detail-section">
                <h3><I n="heart" s={14} /> Motivation</h3>
                <p>{app.motivation}</p>
              </div>
            )}
            {app.experience && (
              <div className="app-detail-section">
                <h3><I n="award" s={14} /> Experience</h3>
                <p>{app.experience}</p>
              </div>
            )}
            {app.media && app.media.length > 0 && (
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:600,color:"var(--g6)",marginBottom:8}}>Uploaded Materials</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8}}>
                  {app.media.map((m,i) => (
                    <div key={i} style={{background:"var(--g1)",borderRadius:12,padding:12,display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:36,height:36,borderRadius:8,background:m.type==="video"?"rgba(96,77,255,.1)":"rgba(29,185,84,.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <I n={m.type==="video"?"eye":"image"} s={16} />
                      </div>
                      <div style={{overflow:"hidden"}}>
                        <div style={{fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.name}</div>
                        <div style={{fontSize:10,color:"var(--g4)"}}>{m.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {prog?.model === "A" && (prog.weeks || []).length > 0 && app.status === "accepted" && (
              <div className="app-detail-section">
                <h3><I n="calendar" s={14} /> Week Assignment</h3>
                <select value={app.weekAssignment || ""} onChange={e => {
                  const wId = e.target.value;
                  setApplications(prev => prev.map(a => a.id === app.id ? { ...a, weekAssignment: wId || null } : a));
                  setShowApplicantDetail({ ...app, weekAssignment: wId || null });
                  showToastMsg(wId ? "Week assigned" : "Week unassigned");
                }} style={{width:"100%",padding:"10px 12px",borderRadius:10,border:"1px solid var(--g2)",background:"var(--sf)",color:"var(--tx)",fontSize:14,fontFamily:"var(--sans)"}}>
                  <option value="">Unassigned</option>
                  {(prog.weeks || []).map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({(w.capacity - (w.spotsLeft ?? w.capacity))}/{w.capacity} spots filled)</option>
                  ))}
                </select>
              </div>
            )}
            <div className="app-detail-section">
              <h3><I n="fileText" s={14} /> Internal Notes</h3>
              <p style={{color: app.notes ? "var(--g5)" : "var(--g4)", fontStyle: app.notes ? "normal" : "italic"}}>{app.notes || "No notes yet"}</p>
            </div>
            <div className="app-detail-section">
              <h3><I n="star" s={14} /> Rating</h3>
              <div style={{display:"flex",gap:4}}>
                {[1,2,3,4,5].map(r => (
                  <span key={r} style={{fontSize:20,color:r <= (app.rating || 0) ? "var(--amber)" : "var(--g3)",cursor:"pointer"}}>★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="app-detail-actions">
            <button className="btn btn-success btn-sm" onClick={()=>updateAppStatus(app.id,"accepted")}><I n="check" s={14} /> Accept</button>
            {prog?.scholarshipTiers && prog.scholarshipTiers.length > 0 && (
              <div style={{position:"relative",display:"inline-block"}}>
                <button className="btn btn-success btn-sm" onClick={(e)=>{
                  const el = e.currentTarget.nextSibling;
                  el.style.display = el.style.display === "block" ? "none" : "block";
                }}><I n="gift" s={14} /> Award Scholarship</button>
                <div style={{display:"none",position:"absolute",top:"100%",left:0,marginTop:4,background:"var(--sf)",border:"1px solid var(--g2)",borderRadius:10,padding:4,minWidth:180,boxShadow:"0 4px 16px rgba(0,0,0,.1)",zIndex:10}}>
                  {prog.scholarshipTiers.map(tier => (
                    <button key={tier.id} style={{display:"block",width:"100%",padding:"8px 12px",border:"none",background:"none",textAlign:"left",fontSize:12,fontWeight:500,cursor:"pointer",borderRadius:6,color:"var(--tx)",fontFamily:"var(--sans)"}}
                      onMouseEnter={e=>e.target.style.background="var(--g1)"}
                      onMouseLeave={e=>e.target.style.background="none"}
                      onClick={()=>{updateAppStatus(app.id,"scholarship",tier.id);showToastMsg(`${tier.name} awarded`);}}
                    >
                      <div style={{fontWeight:600}}>{tier.name}</div>
                      <div style={{fontSize:10,color:"var(--g4)"}}>{tier.discount===100?"Full scholarship":`${tier.discount}% discount`}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button className="btn btn-s btn-sm" onClick={()=>updateAppStatus(app.id,"waitlisted")}><I n="clock" s={14} /> Waitlist</button>
            <button className="btn btn-danger btn-sm" onClick={()=>updateAppStatus(app.id,"rejected")}><I n="xCircle" s={14} /> Reject</button>
          </div>
        </div>
      </div>
    );
  };

  const renderCancelModal = () => {
    const pt = showCancelModal;
    if (!pt) return null;
    const prog = viewProgram;
    const refundPolicy = prog?.refundPolicy || [];
    const daysBeforeStart = prog?.startDate ? Math.max(0, Math.ceil((new Date(prog.startDate) - new Date()) / (1000*60*60*24))) : 0;
    const applicablePolicy = refundPolicy.find(r => daysBeforeStart >= r.daysBefore) || { refundPct: 0 };
    const refundAmount = pt.paidAmount * (applicablePolicy.refundPct / 100);

    return (
      <div className="overlay modal-enter" onClick={()=>setShowCancelModal(null)}>
        <div className="cancel-modal" onClick={e=>e.stopPropagation()}>
          <h3 style={{fontFamily:"var(--serif)",fontSize:20,fontWeight:400,marginBottom:8}}>Process Cancellation</h3>
          <p style={{fontSize:13,color:"var(--g5)",marginBottom:16}}>Cancel {pt.name}'s participation in {prog?.name}.</p>
          <div className="cancel-breakdown">
            <div className="cb-row"><span>Total Paid</span><span>{formatCurrency(pt.paidAmount)}</span></div>
            <div className="cb-row"><span>Days before start</span><span>{daysBeforeStart}</span></div>
            <div className="cb-row"><span>Refund rate</span><span>{applicablePolicy.refundPct}%</span></div>
            <div className="cb-row refund"><span>Refund Amount</span><span>{formatCurrency(refundAmount)}</span></div>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
            <button className="btn btn-s" onClick={()=>setShowCancelModal(null)}>Keep Enrolled</button>
            <button className="btn btn-danger" onClick={()=>processCancellation(pt.id)}>Confirm Cancellation</button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmDialogModal = () => {
    if (!showConfirmDialog) return null;
    return (
      <div className="overlay modal-enter" onClick={()=>setShowConfirmDialog(null)}>
        <div className="confirm-dialog" onClick={e=>e.stopPropagation()}>
          <h3>{showConfirmDialog.title}</h3>
          <p>{showConfirmDialog.message}</p>
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            <button className="btn btn-s" onClick={()=>setShowConfirmDialog(null)}>Cancel</button>
            <button className="btn btn-danger" onClick={showConfirmDialog.onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    );
  };

  // === MAIN RETURN ===
  return (
    <>
      <style>{CSS}</style>

      {publicView ? renderPublicView() : (

      auth !== "app" ? renderAuth() :

      <div className={`shell ${darkMode ? "dark" : ""} ${sidebarCollapsed ? "sb-collapsed" : ""}`}>
        {renderSidebar()}

        <main className={`main ${sidebarCollapsed ? "collapsed" : ""}`}>
          {renderMobileActionBar()}
          {renderContentHeader()}
          <div className="content">
            {viewProgram ? renderProgramDetail() : renderWorkspace()}
          </div>
        </main>

        {renderMobileNav()}

        {showDemoPopup && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
            <div style={{ background: "#1a1a2e", borderRadius: 24, padding: "40px 36px", maxWidth: 520, width: "100%", textAlign: "center", border: "1px solid #2a2a3e", position: "relative", color: "#fff" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #604dff, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, fontWeight: 700, color: "#fff" }}>L</div>
              <div style={{ display: "inline-block", padding: "4px 14px", background: "rgba(96,77,255,.15)", borderRadius: 20, fontSize: 11, fontWeight: 600, color: "#a78bfa", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>DA VINCI UPDATE</div>
              <h2 style={{ fontSize: 24, fontWeight: 300, margin: "0 0 16px", lineHeight: 1.3, color: "#fff" }}>Welcome to Lanced Programs</h2>
              <p style={{ fontSize: 14, color: "#b0b0c0", lineHeight: 1.7, margin: "0 0 8px" }}>
                This is a demo of <strong style={{ color: "#fff" }}>Lanced Programs</strong> — scheduled to launch <strong style={{ color: "#fff" }}>September 1st</strong> for next season.
              </p>
              <p style={{ fontSize: 14, color: "#b0b0c0", lineHeight: 1.7, margin: "0 0 20px" }}>
                Programs are part of our Da Vinci update and will allow you to sell any educational program on the platform including intensives, workshops, masterclasses, and many more.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24, textAlign: "left" }}>
                {["Selection Process", "Scholarships", "Custom Page Builder", "Integrated Payments", "Automated Invoicing", "Workshop Catalog"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#ccc", padding: "6px 0" }}>
                    <span style={{ color: "#604dff" }}>{"\u2713"}</span> {f}
                  </div>
                ))}
              </div>
              <div style={{ padding: "14px 16px", background: "rgba(255,255,255,.05)", borderRadius: 12, marginBottom: 24, border: "1px solid #2a2a3e" }}>
                <p style={{ fontSize: 13, color: "#b0b0c0", margin: 0 }}>
                  Interested in using Lanced Programs next season? Write us at{" "}
                  <a href="mailto:wouter@lanced.app" style={{ color: "#604dff", textDecoration: "none", fontWeight: 600 }}>wouter@lanced.app</a>
                </p>
              </div>
              <button onClick={() => setShowDemoPopup(false)} style={{ width: "100%", padding: "14px", background: "#604dff", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Explore the Demo
              </button>
            </div>
          </div>
        )}

        {showNewProgram && renderNewProgramModal()}
        {showShareModal && renderShareModal()}
        {showApplicantDetail && renderApplicantDetailModal()}
        {showCancelModal && renderCancelModal()}
        {showConfirmDialog && renderConfirmDialogModal()}
        {showArtistAuthModal && renderArtistAuthModal()}
        {showPaymentSetup && (
          <div className="overlay modal-enter" onClick={() => setShowPaymentSetup(null)}>
            <div className="new-prog-modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 18 }}>Setup {showPaymentSetup === "stripe" ? "Stripe" : "Mollie"}</h2>
                <button className="btn btn-g" onClick={() => setShowPaymentSetup(null)}><I n="x" s={18} /></button>
              </div>
              {showPaymentSetup === "stripe" ? (
                <div>
                  <div className="field"><label>Live Publishable Key</label><input type="text" placeholder="pk_live_..." value={paymentProvider.stripe.liveKey} onChange={e => setPaymentProvider(p => ({ ...p, stripe: { ...p.stripe, liveKey: e.target.value } }))} /></div>
                  <div className="field"><label>Live Secret Key</label><input type="password" placeholder="sk_live_..." value={paymentProvider.stripe.secretKey} onChange={e => setPaymentProvider(p => ({ ...p, stripe: { ...p.stripe, secretKey: e.target.value } }))} /></div>
                </div>
              ) : (
                <div>
                  <div className="field"><label>Mollie API Key</label><input type="text" placeholder="live_..." value={paymentProvider.mollie.apiKey} onChange={e => setPaymentProvider(p => ({ ...p, mollie: { ...p.mollie, apiKey: e.target.value } }))} /></div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {paymentProvider[showPaymentSetup]?.connected && (
                  <button className="btn btn-s" style={{ color: "var(--red)" }} onClick={() => { setPaymentProvider(p => ({ ...p, [showPaymentSetup]: { ...p[showPaymentSetup], connected: false, ...(showPaymentSetup === "stripe" ? { liveKey: "", secretKey: "" } : { apiKey: "" }) } })); setShowPaymentSetup(null); showToastMsg(`${showPaymentSetup === "stripe" ? "Stripe" : "Mollie"} disconnected`); }}>Disconnect</button>
                )}
                <button className="btn btn-p btn-press" style={{ marginLeft: "auto" }} onClick={() => { setPaymentProvider(p => ({ ...p, [showPaymentSetup]: { ...p[showPaymentSetup], connected: true } })); setShowPaymentSetup(null); showToastMsg(`${showPaymentSetup === "stripe" ? "Stripe" : "Mollie"} connected!`); }}>
                  {paymentProvider[showPaymentSetup]?.connected ? "Save Changes" : "Connect"}
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
      )}
    </>
  );
}

export default BoxOfficeShell;
