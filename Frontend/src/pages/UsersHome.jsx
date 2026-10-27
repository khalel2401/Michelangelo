import { useNavigate } from "react-router-dom";

//cosas de MaterialUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";


export default function UsersHome() {
    const navigate = useNavigate();
    console.log('UserHome.jsx renderizado');
    const images = [
        {
            url: `${import.meta.env.BASE_URL}Cotizacion.jpg`,
            title: 'Hace tu cotización',
        },
        {
            url: `${import.meta.env.BASE_URL}Evento.jpg`,
            title: 'Tu evento',
        },
    ];
    const ImageButton = styled(ButtonBase)(() => ({
        position: 'relative',
        flex: '1 1 calc(50% - 8px)',
        minWidth: 0,
        height: 'auto',
        aspectRatio: '1 / 1',
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
            opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
            opacity: 0,
            },
            '& .MuiTypography-root': {
            border: '4px solid currentColor',
            },
        },
    }));
    const ImageSrc = styled('img')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));


    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%', justifyContent: 'center' }}>
            
            <Container maxWidth="sm" sx={{
                border: 4,
                borderColor: 'secondary.main',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                mx: 0,
                bgcolor: 'background.paper',
                
            }}>

                <Box sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center' 
                }}>

                    <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center">
                        Buenos dias usuario
                    </Typography>
                    
                   <Divider sx={{ width: '100%', my: 3 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 300, width: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                            Elige una opción
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 2, width: '100%' }}>
                            {images.map((image) => (
                                <ImageButton
                                    focusRipple
                                    key={image.title}
                                >
                                    <ImageSrc src={image.url} alt="" />
                                    <ImageBackdrop className="MuiImageBackdrop-root" />
                                    <Image>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            sx={[
                                                {
                                                    color: 'inherit',
                                                },
                                                (theme) => ({
                                                    position: 'relative',
                                                    p: 4,
                                                    pt: 2,
                                                    pb: `calc(${theme.spacing(1)} + 6px)`,
                                                }),
                                            ]}
                                        >
                                            {image.title}
                                            <ImageMarked className="MuiImageMarked-root"/>
                                        </Typography>

                                    </Image>

                                </ImageButton>
                            ))}
                        </Box>

                    </Box>
                    
                </Box>

            </Container>

        </Box>
    );
}