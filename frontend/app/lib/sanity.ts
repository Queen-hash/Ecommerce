import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: '16hmplas', // Ini Project ID lu yang dari baris 10 tadi
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);
