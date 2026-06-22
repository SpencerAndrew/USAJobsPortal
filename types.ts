// FIX: The `Holiday` interface uses `React.FC`, which requires the `React` namespace. This import provides it.
import React from 'react';

export enum JobSector {
  Government = 'Government',
  Private = 'Private',
}

export interface Job {
  id: string;
  title: string;
  sector: JobSector;
  agency?: string;
  company?: string;
  companyLogo?: string;
  location: string;
  salary: string;
  payGrade?: string;
  type: string;
  securityClearance: string;
  deadline: string;
  applicants: number;
}

export interface Agency {
  abbr: string;
  name: string;
  openPositions: number;
}

export interface Holiday {
  name: string;
  date: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export enum UpdateType {
    Feature = 'Feature',
    Improvement = 'Improvement',
    Fix = 'Fix',
    Security = 'Security',
}

export interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  description: string;
  type: UpdateType;
}

export interface TaxForm {
    id: string;
    name: string;
    description: string;
    category: 'Federal' | 'State';
    state?: string;
    pages: number;
}

export interface Shutdown {
    id: string;
    name: string;
    startDate: string; // ISO format
    endDate: string | null;
    economicCost: string;
    jobsAffected: string;
    description: string;
}

export interface ShutdownQuestion {
    question: string;
    answer: string;
}
