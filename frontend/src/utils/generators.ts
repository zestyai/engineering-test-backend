import { adjectives, animals, uniqueNamesGenerator } from 'unique-names-generator';
import { RiskLevel } from '../models/Risk';

export function generateName(id: string): string {
  const seed: number = getStringCharCodeSum(id);
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: ' ',
    length: 2,
    style: 'capital',
    seed,
  });
}

export function generateRiskLevel(id: string): RiskLevel {
  const seed: number = getStringCharCodeSum(id);
  const moduloRest: number = seed % Object.keys(RiskLevel).length;
  return Object.values(RiskLevel)[moduloRest];
}

function getStringCharCodeSum(str: string): number {
  let charCodeSum = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode: number = str.charCodeAt(i);
    charCodeSum += charCode;
  }
  return charCodeSum;
}
