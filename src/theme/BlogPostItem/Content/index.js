import React, {useState} from 'react';
import BlogPostItemContent from '@theme-original/BlogPostItem/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function GalleryImage({src, alt, onOpen, index}) {
  const imageUrl = useBaseUrl(src);

  return (
    <figure className={styles.item}>
      <button
        className={styles.imageButton}
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Show larger image${alt ? `: ${alt}` : ''}`}>
        <img className={styles.image} src={imageUrl} alt={alt ?? ''} loading="lazy" />
      </button>
      {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
    </figure>
  );
}

function LightboxImage({src, alt}) {
  const imageUrl = useBaseUrl(src);

  return (
    <img
      className={styles.lightboxImage}
      src={imageUrl}
      alt={alt ?? ''}
    />
  );
}

function Gallery({images}) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];
  const showPrevious = () =>
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setSelectedIndex((current) => (current + 1) % images.length);

  return (
    <>
      <section className={styles.gallery} aria-label="Photo gallery">
        {images.map(({src, alt}, index) => (
          <GalleryImage
            key={`${src}-${index}`}
            src={src}
            alt={alt}
            index={index}
            onOpen={setSelectedIndex}
          />
        ))}
      </section>
      {selectedImage && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt || 'Enlarged image'}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedIndex(null);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setSelectedIndex(null);
            } else if (event.key === 'ArrowLeft') {
              event.preventDefault();
              showPrevious();
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              showNext();
            }
          }}>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close enlarged image">
            ×
          </button>
          {images.length > 1 && (
            <button
              className={`${styles.navigationButton} ${styles.previousButton}`}
              type="button"
              onClick={showPrevious}
              aria-label="Show previous image">
              ‹
            </button>
          )}
          <figure className={styles.lightboxFigure}>
            <LightboxImage src={selectedImage.src} alt={selectedImage.alt} />
            {selectedImage.alt && (
              <figcaption className={styles.lightboxCaption}>{selectedImage.alt}</figcaption>
            )}
          </figure>
          {images.length > 1 && (
            <button
              className={`${styles.navigationButton} ${styles.nextButton}`}
              type="button"
              onClick={showNext}
              aria-label="Show next image">
              ›
            </button>
          )}
        </div>
      )}
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
