import React from 'react';
import BlogPostPageContent from '@theme-original/BlogPostPage/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Gallery({images}) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallery} aria-label="Photo gallery">
      {images.map(({src, alt}, index) => (
        <figure className={styles.item} key={`${src}-${index}`}>
          <img className={styles.image} src={useBaseUrl(src)} alt={alt ?? ''} loading="lazy" />
          {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
        </figure>
      ))}
    </section>
  );
}

export default function BlogPostPageContentWrapper(props) {
  const {metadata} = useBlogPost();
  const images = metadata.frontMatter.gallery;

  return (
    <>
      <BlogPostPageContent {...props} />
      <Gallery images={images} />
    </>
  );
}
