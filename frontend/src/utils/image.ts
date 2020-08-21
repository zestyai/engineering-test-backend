export function imageUrl(propertyId: string): string {
  return `/api/property/${propertyId}/image?fileType=png&buildingOverlay=true&resolution=100`;
}
