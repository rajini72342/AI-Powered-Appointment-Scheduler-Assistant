
export interface OCRResult {
  raw_text: string;
  confidence: number;
}

export interface EntityResult {
  date_phrase: string;
  time_phrase: string;
  department: string;
  confidence: number;
}

export interface NormalizationResult {
  date: string;
  time: string;
  tz: string;
  confidence: number;
}

export interface AppointmentData {
  department: string;
  date: string;
  time: string;
  tz: string;
}

export interface PipelineResponse {
  step1_ocr: OCRResult;
  step2_entities: EntityResult;
  step3_normalization: NormalizationResult;
  step4_final: {
    appointment: AppointmentData | null;
    status: 'ok' | 'needs_clarification';
    message?: string;
  };
}

export enum StepStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
