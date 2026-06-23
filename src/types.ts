/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectSpeciality {
  id: string;
  name: string;
  icon: string; // key of lucide-react icon
  description: string;
  details: string[];
  bannerUrl: string;
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  avatarUrl: string;
  text: string;
}

export interface VideoDifferential {
  id: string;
  title: string;
  description: string;
  youtubeId?: string; // and/or local mock video animations
  duration: string;
  category: string;
  thumbnailUrl: string;
  videoHighlights: { time: string; text: string }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  type: string;
  area: string;
  description: string;
  imageUrl: string;
  specialities: string[];
}

export interface LeadSubmission {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  buildingType: string;
  area: number;
  specialities: string[];
}
