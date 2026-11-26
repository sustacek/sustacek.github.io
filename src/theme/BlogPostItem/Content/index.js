import React, {useState} from 'react';
import BlogPostItemContent from '@theme-original/BlogPostItem/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './styles.module.css';

function Gallery({images}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const baseUrl = useBaseUrl('/');

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const resolveImageUrl = (src) => `${baseUrl}${src.replace(/^\/+/, '')}`;
  const slides = images.map(({src, alt}) => ({src: resolveImageUrl(src), alt}));

  return (
    <>
      <section className={styles.gallery} aria-label="Photo gallery">
        {images.map(({src, alt}, imageIndex) => (
          <figure className={styles.item} key={`${src}-${imageIndex}`}>
            <button
              className={styles.imageButton}
              type="button"
              onClick={() => {
                setIndex(imageIndex);
                setOpen(true);
              }}
              aria-label={`Show larger image${alt ? `: ${alt}` : ''}`}>
              <img
                className={styles.image}
                src={resolveImageUrl(src)}
                alt={alt ?? ''}
                loading="lazy"
              />
            </button>
            {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
          </figure>
        ))}
      </section>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{view: ({index: currentIndex}) => setIndex(currentIndex)}}
      />
    </>
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
