import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function TerminosCondiciones(){
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ py: 4, display: 'grid', justifyItems: 'center', gap: 2 }}>
            <Typography variant="h4" component="h1" textAlign="center">
                Términos y condiciones
            </Typography>
            <Paper
                variant="outlined"
                sx={{
                    width: 'min(100%, 680px, calc(100dvh - 160px))',
                    aspectRatio: '1 / 1',
                    maxHeight: 'min(680px, calc(100dvh - 160px))',
                    overflowY: 'auto',
                    p: { xs: 2.5, sm: 4 },
                    borderColor: 'divider',
                    borderRadius: 2,
                    overscrollBehavior: 'contain',
                }}
            >
                <Box sx={{ display: 'grid', gap: 2.5 }}>
                    <Typography color="text.secondary" variant="body2">
                        Última actualización: 8 de octubre de 2026
                    </Typography>

                    <Typography variant="body1"> 
                        Estos términos describen las condiciones generales para poder acceder a los
                        servicios otorgados por la plataforma. Al usar nuestra plataforma, usted acepta
                        que seguirá y cumplirá con los terminos y condiciones que se especificarán acá
                    </Typography>

                    <Box>
                        <Typography variant="h6" component="h2">1. Uso de la plataforma</Typography>
                        <Typography>
                            La plataforma ofrece herramientas para consultar y administrar información.
                            El usuario se compromete a no utilizarla para fines ilícitos, no autorizados 
                            o que puedan arruinar la imagen publica de la empresa.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2">2. Cuenta y acceso</Typography>
                        <Typography>
                            Cuando el acceso requiera una cuenta, el usuario debe proporcionar información
                            correcta y mantener la confidencialidad de sus credenciales. Toda actividad
                            realizada desde una cuenta se considerará responsabilidad de su titular, SIN
                            EXCEPCIONES.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2">3. Información y disponibilidad</Typography>
                        <Typography>
                            Se procura mantener la información de la plataforma actualizada, pero no se
                            garantiza que esté siempre completa, libre de errores o disponible sin
                            interrupciones. Los datos sobre disponibilidad, precios, aforo y características
                            deben confirmarse con la persona o entidad responsable antes de tomar decisiones.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2">4. Reservas y servicios</Typography>
                        <Typography>
                            La visualización de un local, evento o servicio no constituye por sí sola una
                            reserva ni garantiza su contratación. Las condiciones específicas, incluidos
                            precios, pagos, cancelaciones y responsabilidades, deben acordarse directamente
                            con el proveedor correspondiente.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2">5. Datos y privacidad</Typography>
                        <Typography>
                            Sus datos pueden entregados a externos, estos no contendran su información de ingreso,
                            pero si su información y registro de eventos realizados con la empresa.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2">6. Propiedad y contenido</Typography>
                        <Typography>
                            Los nombres, marcas, diseños y materiales de la plataforma pertenecen a sus
                            respectivos titulares. El contenido incorporado por los usuarios debe ser
                            legítimo y contar con las autorizaciones necesarias para su uso.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h2">7. Cambios y contacto</Typography>
                        <Typography>
                            NES eventos se reserva el derecho para modificar, suspender o alterar estos términos en
                            cualquier momento y a su entera discreción, sin necesidad de notificación previa. El uso
                            continuo del servicio tras la publicación de los cambios constituirá la aceptación tácita 
                            e incondicional de los nuevos términos por parte del usuario.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant='h6' component="h2">8. Derechos Espirituales</Typography>
                        <Typography>
                            NES eventos se reserva el derecho para el uso/sacrificio de su alma humana en
                            cualquier momento, para la realización de rituales misticos a entidades mas allá
                            de su comprensión.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant='h6' component="h2">9. Arbitraje</Typography>
                        <Typography>
                            Ante cualquier controversia o reclamación que surja de o esté relacionada con 
                            los terminos y condiciones de NES eventos, o su incumplimiento, se resolverá 
                            mediante arbitraje administrado por nuestro equipo legal. Las partes renuncian
                            expresamente a su derecho a acudir a tribunales ordinarios de justicia.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant='h6' component="h2">10. Clausura de Cuenta Discrecional</Typography>
                        <Typography>
                            NES eventos podrá rescindir, suspender o bloquear el acceso del usuario al servicio de
                            forma inmediata, sin previo aviso y su absoluta discreción, por cualquier motivo o sin 
                            motivo alguno. NES eventos no tendrá la obligación de reembolsar los saldos pendientes
                            ni será responsable por pérdida de datos o contenidos del usuario.
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant='h6' component="h2">11. Indemnización Inversa</Typography>
                        <Typography>
                            El usuario se compromete a indemnizar, defender y mantener indemne a NES eventos y sus
                            directivos frente a cualquier reclamación, daño, perdida o gasto (incluidos los honorarios
                            razonables de abogados) que surjan de su uso del servicio o de la violación de estos términos.
                        </Typography>
                    </Box>

                    <Box
                        component="img"
                        src="/michelangelo-logo.svg"
                        alt="Logo de Michelangelo"
                        sx={{ alignSelf: "center", width: 96, height: 96, objectFit: "contain" }}
                    />

                    
                </Box>
            </Paper>
            <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={() => navigate(-1)}
            >
                Cerrar
            </Button>
        </Container>
    );
}