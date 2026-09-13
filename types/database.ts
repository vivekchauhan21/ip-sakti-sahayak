export type Jurisdiction = 'INDIA_AYUSH' | 'USA_USFDA' | 'EU_EMA' | 'WIPO';

export type RegimeType = 
  | 'PATENT_ACT' 
  | 'BIODIVERSITY_2024' 
  | 'DC_ACT' 
  | 'FSSAI_AYURVEDA_AAHAR';

export type ProductTier =
  | 'CLASSICAL_AYURVEDIC'
  | 'PATENT_PROPRIETARY'
  | 'PHYTOPHARMACEUTICAL'
  | 'NEW_NON_CLASSICAL'
  | 'AYURVEDA_AAHAR'
  | 'AYURVEDIC_COSMETIC';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RegulatoryDocument {
  id: string;
  title: string;
  jurisdiction: Jurisdiction;
  regime_type: RegimeType;
  document_url: string;
  total_pages: number | null;
  created_at: string;
}

export interface DocumentSection {
  id: string;
  document_id: string;
  content: string;
  page_number: number;
  section_clause: string | null;
  highlight_coords: BoundingBox | null;
  embedding?: number[];
  created_at: string;
}

export interface TKDLReference {
  id: string;
  formulation_name: string;
  primary_ingredients: string[];
  ancient_source_text: string;
  shloka_reference: string | null;
  traditional_indication: string | null;
  is_public_domain: boolean;
  created_at: string;
}

export interface MatchedLegalSection {
  id: string;
  document_id: string;
  document_title: string;
  document_url: string;
  content: string;
  page_number: number;
  section_clause: string | null;
  highlight_coords?: BoundingBox | null;
  similarity: number;
}