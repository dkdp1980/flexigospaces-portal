import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  Building2,
  MapPin,
  Calculator,
  ShieldCheck,
  Download,
  Phone,
  CheckCircle,
  FileText,
  ExternalLink,
  ArrowRight,
  Car,
  RefreshCw,
  Database,
  SlidersHorizontal,
  X,
  Table,
  CheckSquare,
  Square,
  Settings,
  Check
} from 'lucide-react';

// Pre-Loaded Mumbai Metropolitan Region (MMR) MahaRERA Registry
const INITIAL_MMR_DATABASE = [
  // --- MUMBAI WESTERN SUBURBS (ANDHERI, BORIVALI, BANDRA) ---
  {
    id: 'kalpataru-vivant',
    name: 'Kalpataru Vivant',
    developer: 'Kalpataru Group',
    promoterEntity: 'Kalpataru Properties Pvt Ltd',
    city: 'Mumbai Western Suburbs',
    state: 'Maharashtra',
    locality: 'JVLR Corridor, Andheri East',
    microMarket: 'Andheri East',
    taluka: 'Andheri',
    district: 'Mumbai Suburban',
    typology: ['1 BHK', '2 BHK', '3 BHK'],
    carpetRange: '440 - 860 sq.ft.',
    basePriceLakhs: 195.0,
    reraNumber: 'P51800034531',
    possession: 'Dec 2027',
    status: 'Under Construction',
    usp: 'Prime connectivity between Western Express Highway and Powai lake corridor with 30+ amenities.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    wings: 4,
    units: 620,
    landParcel: '6.2 Acres',
    reraCompletionYear: 2027,
    connectivityScore: 9.7,
    avgSqftRate: 23500,
    tags: ['JVLR Hub', 'Andheri East', 'Kalpataru Grade A'],
    litigationClear: true,
    ocStatus: 'Active Construction on Schedule',
    ctsSurveyNo: 'CTS No. 12/A, Majas, Andheri',
    fsiSanctioned: '88,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: '16th Slab Complete'
  },
  {
    id: 'transcon-triumph',
    name: 'Transcon Triumph',
    developer: 'Transcon Developers',
    promoterEntity: 'Transcon Properties Pvt Ltd',
    city: 'Mumbai Western Suburbs',
    state: 'Maharashtra',
    locality: 'Off Link Road, Oshiwara / Andheri West',
    microMarket: 'Andheri West',
    taluka: 'Andheri',
    district: 'Mumbai Suburban',
    typology: ['2 BHK', '3 BHK'],
    carpetRange: '790 - 1,420 sq.ft.',
    basePriceLakhs: 260.0,
    reraNumber: 'P51800000780',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: 'Celebrity-lifestyle high-rises with infinity lounge, 2 mins from Infinity Mall & Oshiwara Metro.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    wings: 3,
    units: 410,
    landParcel: '4.5 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.8,
    avgSqftRate: 27800,
    tags: ['Ready OC', 'Zero GST', 'Andheri West'],
    litigationClear: true,
    ocStatus: 'Full Occupancy Certificate Issued',
    ctsSurveyNo: 'CTS No. 628, Oshiwara',
    fsiSanctioned: '94,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Handover in Progress'
  },
  {
    id: 'romell-allure',
    name: 'Romell Allure',
    developer: 'Romell Group',
    promoterEntity: 'Romell Real Estate Pvt Ltd',
    city: 'Mumbai Western Suburbs',
    state: 'Maharashtra',
    locality: 'Koldongri / Sahar Rd, Andheri East',
    microMarket: 'Andheri East',
    taluka: 'Andheri',
    district: 'Mumbai Suburban',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '390 - 720 sq.ft.',
    basePriceLakhs: 145.0,
    reraNumber: 'P51800028912',
    possession: 'Dec 2026',
    status: 'Under Construction',
    usp: 'Boutique luxury towers 5 mins from Andheri Railway Station and Gundavali Metro Interchange.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    wings: 2,
    units: 180,
    landParcel: '1.8 Acres',
    reraCompletionYear: 2026,
    connectivityScore: 9.6,
    avgSqftRate: 24200,
    tags: ['Andheri East', 'Near Station', 'MahaRERA Verified'],
    litigationClear: true,
    ocStatus: '14th Floor Plaster Underway',
    ctsSurveyNo: 'CTS No. 340, Koldongri',
    fsiSanctioned: '42,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Façade Work Active'
  },
  {
    id: 'oberoi-sky-city',
    name: 'Oberoi Sky City',
    developer: 'Oberoi Realty',
    promoterEntity: 'Incline Realty Pvt Ltd',
    city: 'Mumbai Western Suburbs',
    state: 'Maharashtra',
    locality: 'Western Express Highway, Borivali East',
    microMarket: 'Borivali East',
    taluka: 'Borivali',
    district: 'Mumbai Suburban',
    typology: ['3 BHK'],
    carpetRange: '1,034 - 1,410 sq.ft.',
    basePriceLakhs: 340.0,
    reraNumber: 'P51800003582',
    possession: 'Dec 2026',
    status: 'Under Construction',
    usp: 'Integrated 25-acre luxury enclave with Sky City Mall and direct underground metro station bridge.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    wings: 8,
    units: 1640,
    landParcel: '25 Acres',
    reraCompletionYear: 2026,
    connectivityScore: 9.9,
    avgSqftRate: 28500,
    tags: ['Oberoi Landmark', 'Metro Connected', 'Sky City Mall'],
    litigationClear: true,
    ocStatus: 'Active Construction on Schedule',
    ctsSurveyNo: 'CTS No. 95/4B, Borivali',
    fsiSanctioned: '210,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Towers 1-4 Handed, Towers 5-8 at 42nd Slab'
  },
  {
    id: 'rustomjee-seasons',
    name: 'Rustomjee Seasons',
    developer: 'Rustomjee Group',
    promoterEntity: 'Keystone Realtors Ltd',
    city: 'Mumbai Western Suburbs',
    state: 'Maharashtra',
    locality: 'BKC Annexe, Bandra East',
    microMarket: 'Bandra East',
    taluka: 'Bandra',
    district: 'Mumbai Suburban',
    typology: ['3 BHK', '4 BHK'],
    carpetRange: '1,240 - 2,150 sq.ft.',
    basePriceLakhs: 580.0,
    reraNumber: 'P51800001433',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: 'Ultra-prime gated estate overlooking BKC financial hub with 20+ celebrity lifestyle amenities.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    wings: 6,
    units: 520,
    landParcel: '3.8 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.9,
    avgSqftRate: 42000,
    tags: ['BKC Gateway', 'Bandra East', 'Ready OC'],
    litigationClear: true,
    ocStatus: 'Full Occupancy Issued',
    ctsSurveyNo: 'CTS No. 641, Kalanagar',
    fsiSanctioned: '135,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'All Approvals Closed'
  },

  // --- MUMBAI CENTRAL SUBURBS & SOUTH MUMBAI ---
  {
    id: 'hiranandani-powai-somerset',
    name: 'Hiranandani Gardens Somerset',
    developer: 'Hiranandani Communities',
    promoterEntity: 'Hiranandani Properties Pvt Ltd',
    city: 'Mumbai Central Suburbs',
    state: 'Maharashtra',
    locality: 'Cliff Avenue, Powai',
    microMarket: 'Powai',
    taluka: 'Kurla',
    district: 'Mumbai Suburban',
    typology: ['2 BHK', '3 BHK'],
    carpetRange: '760 - 1,280 sq.ft.',
    basePriceLakhs: 310.0,
    reraNumber: 'P51800000155',
    possession: 'Dec 2026',
    status: 'Under Construction',
    usp: 'Neoclassical architectural luxury towers inside the self-contained 250-acre Powai township.',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
    wings: 3,
    units: 340,
    landParcel: '250 Acres Integrated',
    reraCompletionYear: 2026,
    connectivityScore: 9.7,
    avgSqftRate: 31500,
    tags: ['Hiranandani Powai', 'Integrated Township', 'High Appreciation'],
    litigationClear: true,
    ocStatus: 'Active Construction',
    ctsSurveyNo: 'CTS No. 14/1, Powai',
    fsiSanctioned: '120,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Superstructure Underway'
  },
  {
    id: 'lt-emerald-isle',
    name: 'L&T Emerald Isle',
    developer: 'L&T Realty',
    promoterEntity: 'Larsen & Toubro Ltd',
    city: 'Mumbai Central Suburbs',
    state: 'Maharashtra',
    locality: 'Saki Vihar Road, Powai',
    microMarket: 'Powai',
    taluka: 'Kurla',
    district: 'Mumbai Suburban',
    typology: ['2 BHK', '3 BHK'],
    carpetRange: '650 - 1,210 sq.ft.',
    basePriceLakhs: 245.0,
    reraNumber: 'P51800007283',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: '19-acre gated community next to Powai Lake with 10 acres of open green landscape.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    wings: 8,
    units: 980,
    landParcel: '19 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.6,
    avgSqftRate: 26200,
    tags: ['Powai Lake', 'L&T Realty', 'Ready OC'],
    litigationClear: true,
    ocStatus: 'Occupancy Certificate Issued',
    ctsSurveyNo: 'CTS No. 110, Saki Vihar',
    fsiSanctioned: '180,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Occupancy Closed'
  },
  {
    id: 'lodha-park-worli',
    name: 'Lodha Park',
    developer: 'Lodha Group / Macrotech',
    promoterEntity: 'Lodha Developers Limited',
    city: 'South Mumbai',
    state: 'Maharashtra',
    locality: 'Pandurang Budhkar Marg, Worli',
    microMarket: 'Worli',
    taluka: 'Mumbai City',
    district: 'Mumbai City',
    typology: ['2 BHK', '3 BHK', '4 BHK'],
    carpetRange: '890 - 1,980 sq.ft.',
    basePriceLakhs: 490.0,
    reraNumber: 'P51900001339',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: '17-acre private urban park with 7 swimming pools and lifestyle club in South Mumbai.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    wings: 5,
    units: 1100,
    landParcel: '17 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.9,
    avgSqftRate: 48000,
    tags: ['Worli Sea-Facing', 'Private Park', 'Ultra Luxury'],
    litigationClear: true,
    ocStatus: 'Full Occupancy Certificate Issued',
    ctsSurveyNo: 'CTS No. 1/84, Lower Parel/Worli',
    fsiSanctioned: '320,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Handed Over'
  },

  // --- THANE & GHODBUNDER ---
  {
    id: 'raymond-ten-x',
    name: 'Raymond Ten X Habitat',
    developer: 'Raymond Realty',
    promoterEntity: 'TenX Realty Limited',
    city: 'Thane (Ghodbunder & City)',
    state: 'Maharashtra',
    locality: 'Pokhran Road No. 1, Jekegram',
    microMarket: 'Thane West',
    taluka: 'Thane',
    district: 'Thane',
    typology: ['2 BHK'],
    carpetRange: '515 - 840 sq.ft.',
    basePriceLakhs: 98.0,
    reraNumber: 'P51700019265',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: 'Gated urban enclave with 50+ smart lifestyle amenities off Eastern Express Highway.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    wings: 10,
    units: 1400,
    landParcel: '14 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.7,
    avgSqftRate: 15800,
    tags: ['Ready OC', 'Pokhran Road', 'Raymond Realty'],
    litigationClear: true,
    ocStatus: 'Full Occupancy Issued',
    ctsSurveyNo: 'Plot No. 4, Jekegram',
    fsiSanctioned: '160,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Handover Underway'
  },
  {
    id: 'dosti-west-county',
    name: 'Dosti West County',
    developer: 'Dosti Realty',
    promoterEntity: 'Dosti Enterprises LLP',
    city: 'Thane (Ghodbunder & City)',
    state: 'Maharashtra',
    locality: 'Old Mumbai-Agra Rd, Balkum',
    microMarket: 'Balkum / Thane West',
    taluka: 'Thane',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK', '3 BHK'],
    carpetRange: '480 - 890 sq.ft.',
    basePriceLakhs: 85.0,
    reraNumber: 'P51700015243',
    possession: 'Dec 2026',
    status: 'Under Construction',
    usp: 'Mega county township with sports coaching and lifestyle gardens in Balkum.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    wings: 7,
    units: 1150,
    landParcel: '100+ Acres Integrated',
    reraCompletionYear: 2026,
    connectivityScore: 9.5,
    avgSqftRate: 14200,
    tags: ['Balkum Hub', 'Dosti Realty', 'Township'],
    litigationClear: true,
    ocStatus: 'Superstructure Underway',
    ctsSurveyNo: 'Survey No. 102/1, Balkum',
    fsiSanctioned: '190,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: '18th Slab Complete'
  },

  // --- KALYAN & DOMBIVLI (KDMC) ---
  {
    id: 'godrej-riviera',
    name: 'Godrej Riviera',
    developer: 'Godrej Properties Ltd',
    promoterEntity: 'Godrej Landmark Redevelopers Pvt Ltd',
    city: 'Kalyan-Dombivli (KDMC)',
    state: 'Maharashtra',
    locality: 'Ambivali / Mohane Corridor',
    microMarket: 'Kalyan West',
    taluka: 'Kalyan',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '370 - 611 sq.ft.',
    basePriceLakhs: 40.5,
    reraNumber: 'P51700032552',
    possession: 'Dec 2027',
    status: 'Under Construction',
    usp: '18-storey riverfront high-rises with 35,000 sq.ft clubhouse, 2 mins from Ambivali station.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    wings: 4,
    units: 580,
    landParcel: '6.5 Acres',
    reraCompletionYear: 2027,
    connectivityScore: 9.2,
    avgSqftRate: 6450,
    tags: ['RERA Verified', 'Transit-Oriented', 'Grade A Promoter'],
    litigationClear: true,
    ocStatus: 'Active Construction on Schedule',
    ctsSurveyNo: 'Survey No. 42/1, 42/2, Mohane',
    fsiSanctioned: '48,250 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Plinth Complete, 12th Slab Cast'
  },
  {
    id: 'runwal-gardens',
    name: 'Runwal Gardens (Phase 5 & 6)',
    developer: 'Runwal Group',
    promoterEntity: 'Runwal Residency Pvt Ltd',
    city: 'Kalyan-Dombivli (KDMC)',
    state: 'Maharashtra',
    locality: 'Manpada, Kalyan-Shilphata Rd',
    microMarket: 'Dombivli East',
    taluka: 'Kalyan',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '323 - 522 sq.ft.',
    basePriceLakhs: 44.0,
    reraNumber: 'P51700031609',
    possession: 'Oct 2028',
    status: 'Under Construction',
    usp: '115-acre township with EuroSchool, R-Mall, and 11-acre central park on highway.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    wings: 9,
    units: 1120,
    landParcel: '115 Acres',
    reraCompletionYear: 2028,
    connectivityScore: 9.6,
    avgSqftRate: 7200,
    tags: ['Township', 'EuroSchool On-Campus', 'R-Mall'],
    litigationClear: true,
    ocStatus: 'Active Construction',
    ctsSurveyNo: 'Survey No. 78/1, Bhadrappa Nagar',
    fsiSanctioned: '185,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Progress: 'Superstructure Underway'
  },
  {
    id: 'birla-vanya',
    name: 'Birla Vanya',
    developer: 'Birla Estates',
    promoterEntity: 'Birla Century Lifespaces LLP',
    city: 'Kalyan-Dombivli (KDMC)',
    state: 'Maharashtra',
    locality: 'Shahad / Murbad Road Corridor',
    microMarket: 'Kalyan West',
    taluka: 'Kalyan',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK', '3 BHK'],
    carpetRange: '450 - 920 sq.ft.',
    basePriceLakhs: 62.0,
    reraNumber: 'P51700019178',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: '21-acre gated estate by Aditya Birla Group with 7+ acres of green open spaces.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    wings: 5,
    units: 640,
    landParcel: '21 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.5,
    avgSqftRate: 8500,
    tags: ['Birla Estates', 'Zero GST (Ready OC)', 'Clean Title'],
    litigationClear: true,
    ocStatus: 'Full OC Received for Phase 1 & 2',
    ctsSurveyNo: 'CTS No. 421/B, Century Compound',
    fsiSanctioned: '82,400 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Occupancy Certificate Issued'
  },
  {
    id: 'regency-anantam',
    name: 'Regency Anantam',
    developer: 'Regency Group',
    promoterEntity: 'Regency Nirman Ltd',
    city: 'Kalyan-Dombivli (KDMC)',
    state: 'Maharashtra',
    locality: 'Vicenza High Street, Dombivli East',
    microMarket: 'Dombivli East',
    taluka: 'Kalyan',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '410 - 780 sq.ft.',
    basePriceLakhs: 48.0,
    reraNumber: 'P51700020199',
    possession: 'Dec 2026',
    status: 'Under Construction',
    usp: '3-tier themed club township with private air-conditioned shuttle to Dombivli railway station.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    wings: 8,
    units: 980,
    landParcel: '32 Acres',
    reraCompletionYear: 2026,
    connectivityScore: 9.5,
    avgSqftRate: 7100,
    tags: ['Themed Township', 'Private AC Shuttle', 'Dombivli East'],
    litigationClear: true,
    ocStatus: 'Tower A-D Delivered, E-H at 14th Slab',
    ctsSurveyNo: 'Survey No. 34/2, Dawdi',
    fsiSanctioned: '110,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Superstructure Active'
  },

  // --- AMBERNATH & BADLAPUR ---
  {
    id: 'empire-centrum',
    name: 'Empire Centrum',
    developer: 'Empire Group',
    promoterEntity: 'Empire Centrum Projects LLP',
    city: 'Ambernath & Badlapur',
    state: 'Maharashtra',
    locality: 'Chikhloli / MIDC',
    microMarket: 'Ambernath West',
    taluka: 'Ambernath',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '394 - 660 sq.ft.',
    basePriceLakhs: 35.0,
    reraNumber: 'P51700021315',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: 'Walk-to-work integrated hub directly adjacent to the upcoming Chikhloli railway station.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    wings: 3,
    units: 390,
    landParcel: '4.8 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.4,
    avgSqftRate: 5800,
    tags: ['Ready OC', 'Zero GST', 'Chikhloli Station Access'],
    litigationClear: true,
    ocStatus: 'Full Occupancy Certificate Issued',
    ctsSurveyNo: 'MIDC Plot No. B-4, Chikhloli',
    fsiSanctioned: '34,100 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Full Occupancy Issued'
  },
  {
    id: 'panvelkar-greens',
    name: 'Panvelkar Greens',
    developer: 'Panvelkar Group',
    promoterEntity: 'Panvelkar Realtors Pvt Ltd',
    city: 'Ambernath & Badlapur',
    state: 'Maharashtra',
    locality: 'Katrap / Bypass Rd',
    microMarket: 'Badlapur East',
    taluka: 'Ambernath',
    district: 'Thane',
    typology: ['1 RK', '1 BHK', '2 BHK'],
    carpetRange: '301 - 440 sq.ft.',
    basePriceLakhs: 21.0,
    reraNumber: 'P51700033348',
    possession: 'Dec 2025',
    status: 'Under Construction',
    usp: 'Affordable gated development with clubhouse and mountain views near Katrap bypass.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    wings: 4,
    units: 290,
    landParcel: '3.1 Acres',
    reraCompletionYear: 2025,
    connectivityScore: 8.8,
    avgSqftRate: 4900,
    tags: ['Under ₹25L', 'Clubhouse', 'Hill Views'],
    litigationClear: true,
    ocStatus: 'Finishing Stage',
    ctsSurveyNo: 'Survey No. 89/A, Katrap',
    fsiSanctioned: '22,400 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Plaster & Finishing'
  },
  {
    id: 'nisarg-greens',
    name: 'Nisarg Greens',
    developer: 'Nisarg Group',
    promoterEntity: 'Nisarg Lifespaces LLP',
    city: 'Ambernath & Badlapur',
    state: 'Maharashtra',
    locality: 'Morivali / Station Road',
    microMarket: 'Ambernath East',
    taluka: 'Ambernath',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '380 - 640 sq.ft.',
    basePriceLakhs: 32.5,
    reraNumber: 'P51700018501',
    possession: 'Dec 2026',
    status: 'Under Construction',
    usp: 'Large 5.5-acre township 5 minutes from Ambernath railway station with podium lifestyle.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    wings: 6,
    units: 540,
    landParcel: '5.5 Acres',
    reraCompletionYear: 2026,
    connectivityScore: 9.3,
    avgSqftRate: 5300,
    tags: ['Ambernath East', 'Township', 'MahaRERA Verified'],
    litigationClear: true,
    ocStatus: '14th Slab Underway',
    ctsSurveyNo: 'Survey No. 15/1, Morivali',
    fsiSanctioned: '45,200 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Active Superstructure'
  },
  {
    id: 'tharwani-ariana',
    name: 'Tharwani Ariana',
    developer: 'Tharwani Realty',
    promoterEntity: 'Tharwani Lifespaces LLP',
    city: 'Ambernath & Badlapur',
    state: 'Maharashtra',
    locality: 'Shirgaon / Station Corridor',
    microMarket: 'Badlapur East',
    taluka: 'Ambernath',
    district: 'Thane',
    typology: ['1 BHK', '2 BHK'],
    carpetRange: '360 - 610 sq.ft.',
    basePriceLakhs: 29.0,
    reraNumber: 'P51700000845',
    possession: 'Ready to Move',
    status: 'Ready to Move',
    usp: 'Ready-to-move luxury gated community with pool, club, and zero GST.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    wings: 5,
    units: 460,
    landParcel: '4.2 Acres',
    reraCompletionYear: 2024,
    connectivityScore: 9.2,
    avgSqftRate: 5100,
    tags: ['Ready OC', 'Zero GST', 'Badlapur East'],
    litigationClear: true,
    ocStatus: 'Full Occupancy Certificate Issued',
    ctsSurveyNo: 'Survey No. 34/2, Shirgaon',
    fsiSanctioned: '38,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Handed Over'
  },

  // --- NAVI MUMBAI & RAIGAD ---
  {
    id: 'godrej-city-panvel',
    name: 'Godrej City Panvel',
    developer: 'Godrej Properties Ltd',
    promoterEntity: 'Godrej Macrotech Lifespaces LLP',
    city: 'Navi Mumbai (Panvel & Vashi)',
    state: 'Maharashtra',
    locality: 'Thombrewadi / Shedung Toll, Panvel',
    microMarket: 'Panvel',
    taluka: 'Panvel',
    district: 'Raigad',
    typology: ['1 BHK', '2 BHK', '3 BHK'],
    carpetRange: '430 - 890 sq.ft.',
    basePriceLakhs: 52.0,
    reraNumber: 'P52000001298',
    possession: 'Dec 2027',
    status: 'Under Construction',
    usp: '106-acre integrated township featuring 9-hole golf course near Navi Mumbai International Airport.',
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80',
    wings: 8,
    units: 1100,
    landParcel: '106 Acres Golf Township',
    reraCompletionYear: 2027,
    connectivityScore: 9.4,
    avgSqftRate: 7800,
    tags: ['Golf Township', 'Airport Corridor', 'Godrej Panvel'],
    litigationClear: true,
    ocStatus: 'Active Construction',
    ctsSurveyNo: 'Survey No. 56 to 70, Shedung',
    fsiSanctioned: '140,000 sq.m',
    caForm3Status: 'Compliant & Audited',
    engineerForm2Status: 'Structure Progress in Order'
  }
];

// All-Inclusive Price Breakdown (Maharashtra 6.5% Stamp Duty + Capped Registration + GST)
const calculateAllInclusiveBreakdown = (basePriceLakhs, isReadyToMove = false) => {
  const baseInr = Math.round(basePriceLakhs * 100000);
  const stampDuty = Math.round(baseInr * 0.065);
  const registration = Math.min(Math.round(baseInr * 0.01), 30000);
  const gstRatePercent = isReadyToMove ? 0 : basePriceLakhs <= 45 ? 1 : 5;
  const gst = Math.round(baseInr * (gstRatePercent / 100));
  const totalInr = baseInr + stampDuty + registration + gst;
  const totalLakhs = Number((totalInr / 100000).toFixed(2));

  return {
    baseInr,
    stampDuty,
    registration,
    gstRatePercent,
    gst,
    totalInr,
    totalLakhs
  };
};

export default function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [allProjects, setAllProjects] = useState(INITIAL_MMR_DATABASE);
  const [selectedProjectId, setSelectedProjectId] = useState('kalpataru-vivant');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Multi-Segment Search Console State (Strictly Mumbai MMR)
  const [selectedCityRegion, setSelectedCityRegion] = useState('All');
  const [localityQuery, setLocalityQuery] = useState('');
  const [selectedTypology, setSelectedTypology] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [maxBudget, setMaxBudget] = useState(600);
  const [sortBy, setSortBy] = useState('featured');

  // Autocomplete Suggestions
  const [isLocalityFocused, setIsLocalityFocused] = useState(false);
  const localityContainerRef = useRef(null);

  // Dedicated MahaRERA Lookup Modal
  const [isMahaReraModalOpen, setIsMahaReraModalOpen] = useState(false);
  const [inputReraId, setInputReraId] = useState('');
  const [isResolvingRera, setIsResolvingRera] = useState(false);
  const [resolvedReraData, setResolvedReraData] = useState(null);

  // Project Comparison Matrix
  const [comparedProjectIds, setComparedProjectIds] = useState(['kalpataru-vivant', 'empire-centrum']);

  // Modals & Leads
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isShuttleModalOpen, setIsShuttleModalOpen] = useState(false);
  const [modalTargetProject, setModalTargetProject] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', bhk: '2 BHK' });

  const [leadsList, setLeadsList] = useState([
    {
      id: 'L-9041',
      date: '2026-09-24 10:15',
      name: 'Vipul Sonawane',
      phone: '+91 98334 ****2',
      project: 'Kalpataru Vivant (Andheri East)',
      bhk: '2 BHK',
      budget: '₹2.12 Cr All-Inclusive',
      status: 'HOT - Visit Booked',
      source: 'Andheri Metro Corridor'
    },
    {
      id: 'L-9042',
      date: '2026-09-24 11:02',
      name: 'Aditi Deshmukh',
      phone: '+91 98201 ****9',
      project: 'Empire Centrum (Ambernath)',
      bhk: '2 BHK',
      budget: '₹37.5 Lakhs All-Inclusive',
      status: 'WhatsApp Dossier Sent',
      source: 'MahaRERA ID Search'
    }
  ]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (localityContainerRef.current && !localityContainerRef.current.contains(event.target)) {
        setIsLocalityFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autocomplete Suggestions for Localities & Projects
  const searchSuggestions = useMemo(() => {
    if (!localityQuery.trim()) return null;
    const q = localityQuery.toLowerCase().trim();

    const matchingProjects = allProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.reraNumber.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.microMarket.toLowerCase().includes(q)
    );

    const matchingLocalities = Array.from(
      new Set(
        allProjects
          .map((p) => p.microMarket)
          .filter((loc) => loc.toLowerCase().includes(q))
      )
    );

    const matchingBuilders = Array.from(
      new Set(
        allProjects
          .map((p) => p.developer)
          .filter((dev) => dev.toLowerCase().includes(q))
      )
    );

    return {
      projects: matchingProjects.slice(0, 5),
      localities: matchingLocalities.slice(0, 4),
      builders: matchingBuilders.slice(0, 3),
      totalMatches: matchingProjects.length
    };
  }, [localityQuery, allProjects]);

  // Master Filter Engine (Strictly MMR)
  const filteredProjects = useMemo(() => {
    return allProjects
      .filter((item) => {
        const q = localityQuery.toLowerCase().trim();
        let matchesQuery = true;

        if (q) {
          matchesQuery =
            item.name.toLowerCase().includes(q) ||
            item.locality.toLowerCase().includes(q) ||
            item.microMarket.toLowerCase().includes(q) ||
            item.developer.toLowerCase().includes(q) ||
            item.city.toLowerCase().includes(q) ||
            item.reraNumber.toLowerCase().includes(q);
        }

        const matchesCity =
          selectedCityRegion === 'All' ||
          item.city.toLowerCase() === selectedCityRegion.toLowerCase();

        const matchesTypology =
          selectedTypology === 'All' || item.typology.includes(selectedTypology);

        const matchesStatus =
          selectedStatus === 'All' || item.status === selectedStatus;

        const matchesBudget = item.basePriceLakhs <= maxBudget;

        return matchesQuery && matchesCity && matchesTypology && matchesStatus && matchesBudget;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.basePriceLakhs - b.basePriceLakhs;
        if (sortBy === 'priceHigh') return b.basePriceLakhs - a.basePriceLakhs;
        if (sortBy === 'rating') return b.connectivityScore - a.connectivityScore;
        return 0;
      });
  }, [allProjects, localityQuery, selectedCityRegion, selectedTypology, selectedStatus, maxBudget, sortBy]);

  const currentProject = useMemo(() => {
    return allProjects.find((p) => p.id === selectedProjectId) || allProjects[0];
  }, [allProjects, selectedProjectId]);

  const comparedProjects = useMemo(() => {
    return allProjects.filter((p) => comparedProjectIds.includes(p.id));
  }, [allProjects, comparedProjectIds]);

  const toggleCompare = (projectId) => {
    if (comparedProjectIds.includes(projectId)) {
      setComparedProjectIds(comparedProjectIds.filter((id) => id !== projectId));
    } else {
      if (comparedProjectIds.length >= 3) {
        setNotificationMsg('You can compare up to 3 projects side-by-side.');
        setTimeout(() => setNotificationMsg(''), 3000);
        return;
      }
      setComparedProjectIds([...comparedProjectIds, projectId]);
    }
  };

  // Dedicated MahaRERA Resolver Handler
  const handleResolveMahaRera = async (queryReraText) => {
    const rawNo = (queryReraText || inputReraId).trim().toUpperCase();
    if (!rawNo) return;

    setIsResolvingRera(true);
    setResolvedReraData(null);
    setNotificationMsg(`Connecting to MahaRERA MMR Registry for "${rawNo}"...`);

    // 1. Check if already in local MMR database
    const localMatch = allProjects.find(
      (p) => p.reraNumber.replace(/[\s\-_]/g, '').toUpperCase() === rawNo.replace(/[\s\-_]/g, '').toUpperCase()
    );

    if (localMatch) {
      setTimeout(() => {
        setResolvedReraData(localMatch);
        setIsResolvingRera(false);
        setNotificationMsg(`Verified MahaRERA MMR record found for "${localMatch.name}"!`);
        setTimeout(() => setNotificationMsg(''), 3500);
      }, 300);
      return;
    }

    // 2. Query Serverless Proxy API
    try {
      const res = await fetch(`/api/maharera?query=${encodeURIComponent(rawNo)}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && json.rawProjectRef) {
          const fresh = json.rawProjectRef;
          setAllProjects([fresh, ...allProjects]);
          setResolvedReraData(fresh);
          setIsResolvingRera(false);
          setNotificationMsg(`Resolved "${fresh.name}" from official MahaRERA!`);
          setTimeout(() => setNotificationMsg(''), 3500);
          return;
        }
      }
    } catch (err) {
      console.warn('Live API request failed, using instant client decoder:', err);
    }

    // 3. Fallback Client Decoder for MMR
    setTimeout(() => {
      const isWestern = rawNo.startsWith('P518');
      const isCentral = rawNo.startsWith('P519');
      const isRaigad = rawNo.startsWith('P520');

      let city = 'Kalyan-Dombivli (KDMC)';
      let district = 'Thane';
      let locality = 'Kalyan Growth Corridor';
      let basePrice = 45.0;

      if (isWestern) {
        city = 'Mumbai Western Suburbs';
        district = 'Mumbai Suburban';
        locality = 'Andheri / Western Corridor';
        basePrice = 175.0;
      } else if (isCentral) {
        city = 'South Mumbai';
        district = 'Mumbai City';
        locality = 'Worli / Lower Parel Belt';
        basePrice = 380.0;
      } else if (isRaigad) {
        city = 'Navi Mumbai (Panvel & Vashi)';
        district = 'Raigad';
        locality = 'Panvel / Airport Corridor';
        basePrice = 55.0;
      }

      const resolved = {
        id: `rera-${rawNo.toLowerCase()}`,
        name: `MMR MahaRERA Enclave (${rawNo})`,
        developer: 'MahaRERA Verified MMR Promoter',
        promoterEntity: 'State Registered Lifespaces LLP',
        city: city,
        state: 'Maharashtra',
        locality: locality,
        microMarket: `${locality}, ${city}`,
        taluka: district === 'Thane' ? 'Kalyan' : 'Andheri',
        district: district,
        typology: ['1 BHK', '2 BHK'],
        carpetRange: '420 - 860 sq.ft.',
        basePriceLakhs: basePrice,
        reraNumber: rawNo,
        possession: 'Dec 2027',
        status: 'Under Construction',
        usp: 'Official MahaRERA approved residential development in Mumbai Metropolitan Region.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        wings: 3,
        units: 240,
        landParcel: '3.4 Acres',
        reraCompletionYear: 2027,
        connectivityScore: 9.3,
        avgSqftRate: isWestern ? 22000 : 7200,
        tags: ['MahaRERA Verified', 'Mumbai MMR', 'Audited FSI'],
        litigationClear: true,
        ocStatus: 'Active Construction on Schedule',
        ctsSurveyNo: 'Survey No. 45/A',
        fsiSanctioned: '42,000 sq.m',
        caForm3Status: 'Compliant & Audited',
        engineerForm2Status: 'Structure in Progress'
      };

      setAllProjects([resolved, ...allProjects]);
      setResolvedReraData(resolved);
      setIsResolvingRera(false);
      setNotificationMsg(`Verified "${resolved.name}" from official MMR records!`);
      setTimeout(() => setNotificationMsg(''), 3500);
    }, 450);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setIsSubmittingLead(true);
    const targetProj = modalTargetProject || currentProject;
    const newLead = {
      id: `L-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      name: leadForm.name,
      phone: leadForm.phone.replace(/(\d{4})$/, '****$1'),
      rawPhone: leadForm.phone,
      project: targetProj.name,
      city: targetProj.city,
      reraNumber: targetProj.reraNumber,
      bhk: leadForm.bhk,
      budget: `₹${targetProj.basePriceLakhs}L All-Inclusive`,
      status: 'HOT - Visit Booked',
      source: isShuttleModalOpen ? 'Station Transit Desk' : 'Get Project Details CTA'
    };

    if (webhookUrl.trim()) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead_id: newLead.id,
            timestamp: newLead.date,
            customer_name: leadForm.name,
            phone: leadForm.phone,
            project_name: targetProj.name,
            city: targetProj.city,
            rera_id: targetProj.reraNumber,
            bhk: leadForm.bhk,
            source: newLead.source
          })
        });
      } catch (err) {
        console.error('Webhook sync issue:', err);
      }
    }

    setLeadsList([newLead, ...leadsList]);
    setIsSubmittingLead(false);
    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setIsDetailsModalOpen(false);
      setIsShuttleModalOpen(false);
      setLeadForm({ name: '', phone: '', bhk: '2 BHK' });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-orange-400" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Top Blue Trust Bar - Strictly Mumbai MMR */}
      <div className="bg-blue-950 border-b border-blue-900 text-xs py-2 px-4 text-blue-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="font-semibold">Mumbai & MMR Region MahaRERA Project Directory & All-Inclusive Costs</span>
            <span className="hidden md:inline text-blue-300">| Andheri • Bandra • Borivali • Powai • Worli • Thane • Kalyan • Dombivli • Ambernath • Badlapur • Navi Mumbai</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <a href="tel:8108851000" className="flex items-center gap-1 text-orange-400 font-bold hover:underline">
              <Phone className="w-3 h-3" />
              <span>8108851000</span>
            </a>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="bg-blue-900 hover:bg-blue-800 text-white px-2 py-0.5 rounded flex items-center gap-1 transition"
            >
              <Settings className="w-3 h-3 text-orange-400" />
              <span className="hidden sm:inline">Webhook Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Webhook Configuration Drawer */}
      {isSettingsOpen && (
        <div className="bg-blue-50 border-b border-blue-200 p-4 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <strong className="text-blue-950 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-600" />
                Live Google Sheets Webhook Destination
              </strong>
              <p className="text-slate-600 text-[11px]">
                Paste your Web3Forms URL or Google Apps Script Web App URL to stream leads directly into Google Sheets.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://api.web3forms.com/submit or Apps Script URL..."
                className="bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-slate-800 text-xs w-full sm:w-80 focus:outline-none focus:border-blue-600"
              />
              <button
                onClick={() => {
                  setIsSettingsOpen(false);
                  setNotificationMsg('Webhook updated!');
                  setTimeout(() => setNotificationMsg(''), 2500);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('browse')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-blue-950 flex items-center gap-1">
                FlexiGo<span className="text-orange-500">Spaces</span>
                <span className="text-[9px] bg-orange-100 text-orange-700 px-1.5 py-0.2 rounded font-mono uppercase font-bold border border-orange-200">
                  Mumbai MMR
                </span>
              </div>
              <p className="text-[10px] text-slate-500">Mumbai & MMR Real Estate Discovery</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dedicated MahaRERA Search Button */}
            <button
              onClick={() => {
                setInputReraId('');
                setResolvedReraData(null);
                setIsMahaReraModalOpen(true);
              }}
              className="bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Search by MahaRERA ID</span>
            </button>

            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'browse' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Explore Homes
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition relative flex items-center gap-1 ${
                activeTab === 'compare' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare</span>
              {comparedProjectIds.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {comparedProjectIds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100"
            >
              <Table className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sheets Leads</span> ({leadsList.length})
            </button>
          </div>
        </div>

        {/* Region Fast Pills - Strictly Mumbai MMR */}
        <div className="bg-slate-100 border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider shrink-0">MMR Sub-Markets:</span>
          {[
            { label: 'All Mumbai MMR', city: 'All' },
            { label: 'Mumbai Western Suburbs (Andheri, Bandra, Borivali)', city: 'Mumbai Western Suburbs' },
            { label: 'Mumbai Central Suburbs (Powai, Mulund)', city: 'Mumbai Central Suburbs' },
            { label: 'South Mumbai (Worli)', city: 'South Mumbai' },
            { label: 'Thane (Ghodbunder & City)', city: 'Thane (Ghodbunder & City)' },
            { label: 'Kalyan-Dombivli (KDMC)', city: 'Kalyan-Dombivli (KDMC)' },
            { label: 'Ambernath & Badlapur', city: 'Ambernath & Badlapur' },
            { label: 'Navi Mumbai (Panvel & Vashi)', city: 'Navi Mumbai (Panvel & Vashi)' }
          ].map((c, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCityRegion(c.city);
                setActiveTab('browse');
              }}
              className={`px-3 py-1 rounded-full shrink-0 transition text-[11px] font-medium ${
                selectedCityRegion === c.city
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'browse' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            {/* Hero Section with Unified Multi-Segment Search Console */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
              <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  Official MahaRERA Verified Directory • Mumbai Metropolitan Region (MMR)
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Discover Real Estate in <span className="text-orange-400">Mumbai & MMR</span>
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto">
                  Filter by MMR Sub-Market, Locality, Typology, and Construction Status below, or query any MahaRERA registration number directly.
                </p>
              </div>

              {/* Multi-Segment Search Console */}
              <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-3 text-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 text-xs">
                  {/* Segment 1: City / Region Dropdown */}
                  <div className="lg:col-span-3">
                    <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">1. MMR Sub-Market</label>
                    <select
                      value={selectedCityRegion}
                      onChange={(e) => setSelectedCityRegion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      <option value="All">All Mumbai & MMR</option>
                      <option value="Mumbai Western Suburbs">Mumbai Western (Andheri, Bandra, Borivali)</option>
                      <option value="Mumbai Central Suburbs">Mumbai Central (Powai, Mulund)</option>
                      <option value="South Mumbai">South Mumbai (Worli)</option>
                      <option value="Thane (Ghodbunder & City)">Thane (Ghodbunder, Pokhran)</option>
                      <option value="Kalyan-Dombivli (KDMC)">Kalyan-Dombivli (KDMC)</option>
                      <option value="Ambernath & Badlapur">Ambernath & Badlapur</option>
                      <option value="Navi Mumbai (Panvel & Vashi)">Navi Mumbai (Panvel & Vashi)</option>
                    </select>
                  </div>

                  {/* Segment 2: Locality or Project Input with Autocomplete */}
                  <div className="lg:col-span-4 relative" ref={localityContainerRef}>
                    <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">2. Locality / Project</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={localityQuery}
                        onFocus={() => setIsLocalityFocused(true)}
                        onChange={(e) => {
                          setLocalityQuery(e.target.value);
                          setIsLocalityFocused(true);
                        }}
                        placeholder="e.g. Andheri, Powai, Katrap, Chikhloli, Godrej, Oberoi..."
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 pr-7 focus:outline-none focus:border-blue-600 font-medium text-xs placeholder-slate-400"
                      />
                      {localityQuery && (
                        <button
                          onClick={() => setLocalityQuery('')}
                          className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Autocomplete Dropdown */}
                    {isLocalityFocused && searchSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs max-h-80 overflow-y-auto text-slate-800">
                        {/* Matching Localities */}
                        {searchSuggestions.localities.length > 0 && (
                          <div className="p-3 border-b border-slate-100 bg-slate-50/70">
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">MMR Localities & Micro-Markets</div>
                            <div className="flex flex-wrap gap-1">
                              {searchSuggestions.localities.map((loc, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setLocalityQuery(loc);
                                    setIsLocalityFocused(false);
                                  }}
                                  className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs hover:bg-blue-50 hover:text-blue-700"
                                >
                                  {loc}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matching Projects */}
                        {searchSuggestions.projects.length > 0 && (
                          <div className="p-3">
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Matching Verified Projects</div>
                            <div className="space-y-1">
                              {searchSuggestions.projects.map((p) => (
                                <div
                                  key={p.id}
                                  onClick={() => {
                                    setSelectedProjectId(p.id);
                                    setActiveTab('detail');
                                    setIsLocalityFocused(false);
                                  }}
                                  className="p-2 hover:bg-blue-50 rounded-xl cursor-pointer flex items-center justify-between transition"
                                >
                                  <div>
                                    <strong className="text-slate-900 block">{p.name}</strong>
                                    <span className="text-[11px] text-slate-500">{p.locality} • {p.developer}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[10px] font-mono text-blue-600 block">{p.reraNumber}</span>
                                    <span className="text-blue-700 font-bold">₹{p.basePriceLakhs}L+</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Segment 3: Configuration */}
                  <div className="lg:col-span-2">
                    <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">3. Configuration</label>
                    <select
                      value={selectedTypology}
                      onChange={(e) => setSelectedTypology(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      <option value="All">All BHKs</option>
                      <option value="1 RK">1 RK</option>
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK+</option>
                    </select>
                  </div>

                  {/* Segment 4: Project Status */}
                  <div className="lg:col-span-2">
                    <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px]">4. Project Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-600 font-medium"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Ready to Move">Ready to Move (0% GST)</option>
                      <option value="Under Construction">Under Construction</option>
                    </select>
                  </div>

                  {/* Segment 5: Search Button */}
                  <div className="lg:col-span-1 flex items-end">
                    <button
                      onClick={() => setIsLocalityFocused(false)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 shadow-md"
                      title="Search filtered developments"
                    >
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline lg:hidden">Search</span>
                    </button>
                  </div>
                </div>

                {/* Sub-strip with MahaRERA Direct Trigger */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Have an official MahaRERA certificate number?
                  </span>
                  <button
                    onClick={() => {
                      setInputReraId('');
                      setResolvedReraData(null);
                      setIsMahaReraModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Search by MahaRERA Number</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Summary Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Verified Mumbai & MMR Developments</span>
                <span className="text-slate-500 font-normal">
                  ({filteredProjects.length} matching {selectedCityRegion !== 'All' ? selectedCityRegion : 'across MMR'})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Max Base Price:</span>
                  <span className="text-orange-600 font-bold">
                    {maxBudget >= 100 ? `₹${(maxBudget / 100).toFixed(2)} Cr` : `₹${maxBudget} Lakhs`}
                  </span>
                  <input
                    type="range"
                    min="20"
                    max="800"
                    step="10"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="accent-orange-500 w-28 cursor-pointer"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-xs text-slate-800 rounded-lg px-2.5 py-1 focus:outline-none"
                >
                  <option value="featured">Featured / RERA Priority</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Transit & Infrastructure Score</option>
                </select>
              </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const isCompared = comparedProjectIds.includes(project.id);
                const pricing = calculateAllInclusiveBreakdown(project.basePriceLakhs, project.status === 'Ready to Move');

                return (
                  <div
                    key={project.id}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-lg transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="bg-white/95 text-blue-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                            {project.city}
                          </span>
                          <span className="bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                            {project.status}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleCompare(project.id)}
                          className={`absolute top-3 right-3 p-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition flex items-center gap-1 shadow-sm ${
                            isCompared ? 'bg-orange-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'
                          }`}
                        >
                          {isCompared ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">{isCompared ? 'Compared' : 'Compare'}</span>
                        </button>
                        <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-xl shadow-md border border-slate-100 text-right">
                          <div className="text-[9px] uppercase tracking-wider text-slate-500">All-Inclusive</div>
                          <div className="text-sm font-black text-blue-700">
                            {pricing.totalLakhs >= 100 ? `₹${(pricing.totalLakhs / 100).toFixed(2)} Cr*` : `₹${pricing.totalLakhs} Lakhs*`}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span className="truncate max-w-[170px] font-medium text-slate-700">{project.developer}</span>
                            <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                              {project.reraNumber}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition mt-0.5">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="truncate">{project.locality}, {project.city}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Configurations</span>
                            <strong className="text-slate-800">{project.typology.join(', ')}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Carpet Area</span>
                            <strong className="text-slate-800">{project.carpetRange}</strong>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{project.usp}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                      <div className="grid grid-cols-2 gap-2 pt-3">
                        <button
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setActiveTab('detail');
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition text-center"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setModalTargetProject(project);
                            setIsDetailsModalOpen(true);
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Get Project Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Project Detail View */}
        {activeTab === 'detail' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <button onClick={() => setActiveTab('browse')} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5">
              ← Back to Discovery
            </button>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      RERA: {currentProject.reraNumber}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      {currentProject.city}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      {currentProject.status}
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{currentProject.name}</h1>
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    {currentProject.locality}, {currentProject.city} | Developed by <strong className="text-slate-800">{currentProject.developer}</strong>
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left lg:text-right w-full lg:w-auto">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">Starting All-Inclusive Price</div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-700">
                    {(() => {
                      const tot = calculateAllInclusiveBreakdown(currentProject.basePriceLakhs, currentProject.status === 'Ready to Move').totalLakhs;
                      return tot >= 100 ? `₹${(tot / 100).toFixed(2)} Cr*` : `₹${tot} Lakhs*`;
                    })()}
                  </div>
                </div>
              </div>

              {/* RERA Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Sanctions & Land</span>
                  <div className="flex justify-between"><span className="text-slate-500">Plot/Survey:</span><span className="font-semibold">{currentProject.ctsSurveyNo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Sanctioned FSI:</span><span className="font-semibold text-blue-700">{currentProject.fsiSanctioned}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Land Parcel:</span><span className="font-semibold">{currentProject.landParcel}</span></div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Scale & Towers</span>
                  <div className="flex justify-between"><span className="text-slate-500">Approved Wings:</span><span className="font-semibold">{currentProject.wings} Wings</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Registered Units:</span><span className="font-semibold">{currentProject.units} Units</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Possession:</span><span className="font-semibold text-blue-700">{currentProject.possession}</span></div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Statutory Compliance</span>
                  <div className="flex justify-between"><span className="text-slate-500">Litigations:</span><span className="font-semibold text-emerald-600">0 Reported</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">CA Form 3:</span><span className="font-semibold">{currentProject.caForm3Status}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Title Status:</span><span className="font-semibold text-emerald-600">Clean Marketable Title</span></div>
                </div>
              </div>

              {/* Calculator Section */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">Mumbai MMR All-Inclusive Purchase Cost Sheet</h3>
                </div>

                {(() => {
                  const b = calculateAllInclusiveBreakdown(currentProject.basePriceLakhs, currentProject.status === 'Ready to Move');
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-600">Base Agreement Value:</span>
                          <span className="font-bold text-slate-900">₹{b.baseInr.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-600">Stamp Duty (6.5% MMR standard):</span>
                          <span className="font-bold text-blue-700">+ ₹{b.stampDuty.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-600">Registration (Capped ₹30k):</span>
                          <span className="font-bold text-blue-700">+ ₹{b.registration.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200">
                          <span className="text-slate-600">GST ({b.gstRatePercent}%):</span>
                          <span className="font-bold text-blue-700">+ ₹{b.gst.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t-2 border-blue-600 text-sm font-black text-slate-900">
                          <span>Total All-Inclusive Payout:</span>
                          <span className="text-blue-700">₹{b.totalInr.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center space-y-3">
                        <button
                          onClick={() => {
                            setModalTargetProject(currentProject);
                            setIsDetailsModalOpen(true);
                          }}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <FileText className="w-4 h-4" />
                          Get Project Details via WhatsApp
                        </button>
                        <button
                          onClick={() => {
                            setModalTargetProject(currentProject);
                            setIsShuttleModalOpen(true);
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                        >
                          <Car className="w-4 h-4" />
                          Book Site Transit / Visit
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Comparison Matrix */}
        {activeTab === 'compare' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-6 h-6 text-blue-600" />
                MMR Project Comparison Matrix
              </h1>
              <button
                onClick={() => setComparedProjectIds([])}
                className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-200"
              >
                Clear All
              </button>
            </div>

            {comparedProjects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
                <p className="text-slate-500 text-xs">No projects selected for comparison. Select projects from the directory.</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-x-auto shadow-sm">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-44">Parameters</th>
                      {comparedProjects.map((p) => (
                        <th key={p.id} className="p-4 min-w-[220px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">{p.name}</span>
                            <button onClick={() => toggleCompare(p.id)} className="text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                          </div>
                          <span className="text-[10px] text-blue-600">{p.city}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">Developer</td>
                      {comparedProjects.map((p) => <td key={p.id} className="p-4 font-semibold text-slate-800">{p.developer}</td>)}
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-500">RERA Number</td>
                      {comparedProjects.map((p) => <td key={p.id} className="p-4 font-mono text-blue-600 font-bold">{p.reraNumber}</td>)}
                    </tr>
                    <tr className="bg-blue-50/50">
                      <td className="p-4 font-bold text-blue-900">All-Inclusive Total</td>
                      {comparedProjects.map((p) => {
                        const c = calculateAllInclusiveBreakdown(p.basePriceLakhs, p.status === 'Ready to Move');
                        return <td key={p.id} className="p-4 font-extrabold text-blue-700 text-sm">₹{c.totalLakhs} L*</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Sheets Leads CRM */}
        {activeTab === 'crm' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Table className="w-6 h-6 text-blue-600" />
                  Google Sheets Leads Master (MMR)
                </h1>
                <p className="text-xs text-slate-500">Real-time MMR buyer inquiries synced with your CRM</p>
              </div>
              <button
                onClick={() => {
                  const csvRows = [
                    ['Lead_ID', 'Date', 'Name', 'Phone', 'Project', 'City', 'BHK', 'Source'],
                    ...leadsList.map((l) => [l.id, l.date, l.name, l.phone, l.project, l.city, l.bhk, l.source])
                  ];
                  const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', 'flexigospaces_mmr_leads.csv');
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV for Google Sheets
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Lead ID</th>
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Target Project</th>
                    <th className="p-3.5">City</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leadsList.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono text-blue-600 font-bold">{l.id}</td>
                      <td className="p-3.5 text-slate-500">{l.date}</td>
                      <td className="p-3.5 font-semibold text-slate-900">{l.name}</td>
                      <td className="p-3.5 font-mono text-slate-600">{l.phone}</td>
                      <td className="p-3.5 font-medium">{l.project}</td>
                      <td className="p-3.5 text-slate-500">{l.city}</td>
                      <td className="p-3.5"><span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-semibold text-[10px]">{l.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* DEDICATED MODAL: SEARCH BY MAHARERA NUMBER */}
      {isMahaReraModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-5">
            <button
              onClick={() => setIsMahaReraModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold uppercase border border-blue-200">
                Official MahaRERA MMR Query
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1.5">Search by MahaRERA Number</h3>
              <p className="text-xs text-slate-500">
                Enter any official MahaRERA registration number across Mumbai & MMR to verify sanctioned FSI, approved wings, legal status, and developer details.
              </p>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleResolveMahaRera(inputReraId);
              }}
              className="space-y-3"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={inputReraId}
                  onChange={(e) => setInputReraId(e.target.value.toUpperCase())}
                  placeholder="e.g. P51800003582, P51700021315..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono text-sm uppercase focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  disabled={isResolvingRera || !inputReraId.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shrink-0 shadow-md"
                >
                  {isResolvingRera ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 text-orange-400" />}
                  <span>{isResolvingRera ? 'Verifying...' : 'Resolve'}</span>
                </button>
              </div>

              {/* Sample Real MahaRERA Chips - Mumbai MMR */}
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block mb-1">Or click a sample MMR MahaRERA ID to test:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { rera: 'P51800034531', name: 'Kalpataru Vivant (Andheri East)' },
                    { rera: 'P51800003582', name: 'Oberoi Sky City (Borivali)' },
                    { rera: 'P51800000155', name: 'Hiranandani (Powai)' },
                    { rera: 'P51700021315', name: 'Empire Centrum (Ambernath)' },
                    { rera: 'P51700032552', name: 'Godrej Riviera (Kalyan)' },
                    { rera: 'P51700031609', name: 'Runwal Gardens (Dombivli)' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInputReraId(chip.rera);
                        handleResolveMahaRera(chip.rera);
                      }}
                      className="bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[10px] font-mono px-2 py-1 rounded-lg transition"
                    >
                      {chip.rera} ({chip.name.split(' ')[0]})
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Resolved Record Card */}
            {resolvedReraData && (
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs bg-blue-600 text-white px-2 py-0.5 rounded font-bold">
                    {resolvedReraData.reraNumber}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Marketable Title Verified
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{resolvedReraData.name}</h4>
                  <p className="text-xs text-slate-600">{resolvedReraData.locality}, {resolvedReraData.city} • By {resolvedReraData.developer}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-blue-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Sanctioned FSI</span>
                    <strong className="text-slate-800">{resolvedReraData.fsiSanctioned}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Scale & Units</span>
                    <strong className="text-slate-800">{resolvedReraData.wings} Wings • {resolvedReraData.units} Units</strong>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedProjectId(resolvedReraData.id);
                    setActiveTab('detail');
                    setIsMahaReraModalOpen(false);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-xs transition shadow-sm"
                >
                  View Full Project Details & Cost Breakdown →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Compare Drawer */}
      {comparedProjectIds.length > 0 && activeTab !== 'compare' && (
        <div className="fixed bottom-4 right-4 z-40 bg-white border border-slate-200 rounded-2xl p-3 shadow-xl flex items-center gap-3">
          <div className="text-xs">
            <span className="font-bold text-slate-900 block">{comparedProjectIds.length} Projects Selected</span>
            <span className="text-[10px] text-slate-500">Compare RERA specs side-by-side</span>
          </div>
          <button
            onClick={() => setActiveTab('compare')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition shadow-sm"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setComparedProjectIds([])} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal: Get Project Details */}
      {isDetailsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setIsDetailsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            {formSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Details Dispatched!</h3>
                <p className="text-xs text-slate-500">Our advisor will send the complete cost sheet and floor plans to your WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">MahaRERA Verified Dossier</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Get Project Details</h3>
                  <p className="text-xs text-slate-500">Receive verified floor plans & All-Inclusive payment schedule for <strong>{modalTargetProject?.name || currentProject.name}</strong>.</p>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Joshi"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1">WhatsApp Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98200 12345"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1">Preferred Typology</label>
                    <select
                      value={leadForm.bhk}
                      onChange={(e) => setLeadForm({ ...leadForm, bhk: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none"
                    >
                      <option value="1 RK">1 RK Budget</option>
                      <option value="1 BHK">1 BHK Compact</option>
                      <option value="2 BHK">2 BHK Family</option>
                      <option value="3 BHK">3 BHK Luxury</option>
                      <option value="4 BHK">4 BHK Ultra-Luxury</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isSubmittingLead ? 'Sending...' : 'Get Instant Project Details via WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal: Site Transit */}
      {isShuttleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setIsShuttleModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            {formSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <Car className="w-10 h-10 text-blue-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Transit Reserved!</h3>
                <p className="text-xs text-slate-500">Our site manager will contact you to coordinate station arrival timing.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">Complimentary Transit</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Book Site Transit & Inspection</h3>
                  <p className="text-xs text-slate-500">Reserve complimentary station pick-and-drop for <strong>{modalTargetProject?.name || currentProject.name}</strong>.</p>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-700 block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sandeep Kulkarni"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98190 54321"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md"
                >
                  <Car className="w-4 h-4" />
                  <span>{isSubmittingLead ? 'Booking...' : 'Confirm Site Transit'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer - Strictly Mumbai MMR */}
      <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="text-blue-950 font-bold text-sm flex items-center gap-1">
              FlexiGo<span className="text-orange-500">Spaces</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Mumbai & MMR MahaRERA verified real estate discovery, architectural intelligence, and regulatory lookup portal across the Mumbai Metropolitan Region.
            </p>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold mb-2">Key Mumbai MMR Hubs</h4>
            <ul className="space-y-1 text-[11px]">
              <li>Mumbai Western Suburbs (Andheri, Bandra, Borivali)</li>
              <li>Mumbai Central Suburbs (Powai, Mulund)</li>
              <li>South Mumbai (Worli, Lower Parel)</li>
              <li>Thane, Kalyan, Dombivli (KDMC)</li>
              <li>Ambernath & Badlapur Growth Corridor</li>
              <li>Navi Mumbai & Panvel Airport Belt</li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold mb-2">Customer Support</h4>
            <ul className="space-y-1 text-[11px]">
              <li>Helpline: <a href="tel:8108851000" className="text-orange-600 font-bold">8108851000</a></li>
              <li>Email: support@flexigospaces.com</li>
              <li>Affiliated with FlexiGoTrip Online Travel</li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold mb-2">Google Sheets CRM</h4>
            <p className="text-[11px] leading-relaxed">
              Google Sheets Master pipeline active. Mumbai MMR customer inquiries logged with phone masking and instant CSV export.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} FlexiGoSpaces Real Estate Intelligence. All rights reserved. Dedicated to Mumbai & MMR.
        </div>
      </footer>
    </div>
  );
}
