import React, {useState} from 'react';
import BlogPostItemContent from '@theme-original/BlogPostItem/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function GalleryImage({src, alt, onOpen}) {
  const imageUrl = useBaseUrl(src);

  return (
    <figure className={styles.item}>
      <button
        className={styles.imageButton}
        type="button"
        onClick={() => onOpen({src, alt, imageUrl})}
        aria-label={`Show larger image${alt ? `: ${alt}` : ''}`}>
        <img className={styles.image} src={imageUrl} alt={alt ?? ''} loading="lazy" />
      </button>
      {alt && <figcaption className={styles.caption}>{alt}</figcaption>}
    </figure>
  );
}

function Gallery({images}) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <>
      <section className={styles.gallery} aria-label="Photo gallery">
        {images.map(({src, alt}, index) => (
          <GalleryImage
            key={`${src}-${index}`}
            src={src}
            alt={alt}
            onOpen={setSelectedImage}
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
              setSelectedImage(null);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setSelectedImage(null);
            }
          }}>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close enlarged image">
            ×
          </button>
          <figure className={styles.lightboxFigure}>
            <img
              className={styles.lightboxImage}
              src={selectedImage.imageUrl}
              alt={selectedImage.alt ?? ''}
            />
            {selectedImage.alt && (
              <figcaption className={styles.lightboxCaption}>{selectedImage.alt}</figcaption>
            )}
          </figure>
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
