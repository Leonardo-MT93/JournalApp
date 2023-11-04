import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageGallery = ({ images }) =>  {
  return (
    <Box sx={{ width: '100%', height: 750, overflow: 'scroll' }}>
<ImageList  variant='masonry' cols={5} 
// rowHeight={164}
gap={8}
>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            // srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            // src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${image}?w=248&fit=crop&auto=format`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Box>    
  );
}
