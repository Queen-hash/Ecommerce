import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '16hmplas', // Ini Project ID lu yang dari baris 10 tadi
  dataset: 'production',
  apiVersion: '2024-03-01', 
  useCdn: true, 
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);