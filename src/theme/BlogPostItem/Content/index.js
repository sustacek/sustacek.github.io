import React from 'react';
import BlogPostItemContent from '@theme-original/BlogPostItem/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function GalleryImage({src, alt}) {
  const imageUrl = useBaseUrl(src);

  return (
    <figure className={styles.item}>
      <img className={styles.image} src={imageUrl} alt={alt ?? ''} loading="lazy" />
      {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
    </figure>
  );
}

function Gallery({images}) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallery} aria-label="Photo gallery">
      {images.map(({src, alt}, index) => (
        <GalleryImage key={`${src}-${index}`} src={src} alt={alt} />
      ))}
    </section>
  );
}

export default function BlogPostItemContentWrapper(props) {
  const {metadata, isBlogPostPage} = useBlogPost();
  const images = metadata.frontMatter.gallery;

  return (
    <>
      <BlogPostItemContent {...props} />
      {isBlogPostPage && <Gallery images={images} />}
    </>
  );
}
