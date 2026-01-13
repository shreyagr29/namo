import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, InputAdornment } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (meetingCode.trim().length > 0) {
            await addToUserHistory(meetingCode)
            navigate(`/${meetingCode}`)
        }
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'var(--bg-dark)', 
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(10, 132, 255, 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(48, 209, 88, 0.05) 0%, transparent 20%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Navigation Bar */}
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 40px',
                backdropFilter: 'blur(10px)',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: '10px' }}>
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '12px', 
                        background: 'linear-gradient(135deg, #0A84FF 0%, #0056b3 100%)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(10, 132, 255, 0.3)'
                    }}>
                        <VideoCallIcon style={{ color: 'white' }} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Namo</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: '20px' }}>
                    <Button 
                        onClick={() => navigate("/history")}
                        startIcon={<RestoreIcon />}
                        sx={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            textTransform: 'none',
                            '&:hover': { color: 'white', background: 'rgba(255,255,255,0.05)' }
                        }}
                    >
                        History
                    </Button>
                    <Button 
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        startIcon={<LogoutIcon />}
                        sx={{ 
                            color: '#FF453A', 
                            textTransform: 'none',
                            '&:hover': { background: 'rgba(255, 69, 58, 0.1)' }
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ 
                flex: 1, 
                display: 'grid', 
                gridTemplateColumns: 'minmax(400px, 1fr) 1fr', 
                gap: '60px', 
                padding: '120px 8% 40px',
                alignItems: 'center',
                maxWidth: '1440px',
                margin: '0 auto',
                width: '100%'
            }}>
                {/* Left Panel: Join Action */}
                <div style={{ zIndex: 2 }}>
                    <h1 style={{ 
                        fontSize: '3.5rem', 
                        fontWeight: 800, 
                        lineHeight: 1.1, 
                        marginBottom: '20px',
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #A5A5A5 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Premium video calls.<br />
                        Now free for everyone.
                    </h1>
                    <p style={{ 
                        fontSize: '1.1rem', 
                        color: 'var(--text-secondary)', 
                        marginBottom: '40px', 
                        lineHeight: 1.6,
                        maxWidth: '500px'
                    }}>
                         Connect, collaborate, and celebrate from anywhere with crystal clear high-definition video and audio.
                    </p>

                    <div className="glass-panel" style={{ 
                        padding: '30px', 
                        borderRadius: '24px', 
                        maxWidth: '480px',
                        background: 'rgba(28, 28, 30, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
                            <TextField 
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)} 
                                placeholder="Enter meeting code" 
                                variant="outlined" 
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyboardIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                                        </InputAdornment>
                                    ),
                                    style: { color: 'white', height: '56px' }
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                                        '&.Mui-focused fieldset': { borderColor: '#0A84FF' },
                                    }
                                }}
                            />
                            <Button 
                                onClick={handleJoinVideoCall} 
                                variant='contained'
                                disabled={!meetingCode}
                                sx={{
                                    borderRadius: '16px',
                                    padding: '0 32px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    background: 'var(--primary-color)',
                                    boxShadow: '0 4px 12px rgba(10, 132, 255, 0.3)',
                                    '&:hover': {
                                        background: '#0070E0'
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.3)'
                                    }
                                }}
                            >
                                Join
                            </Button>
                        </div>
                        <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                            Don't have a code? <span style={{ color: '#0A84FF', cursor: 'pointer' }} onClick={() => {
                                const randomCode = Math.random().toString(36).substring(7);
                                setMeetingCode(randomCode);
                            }}>Generate one</span>
                        </p>
                    </div>
                </div>

                {/* Right Panel: Illustration */}
                <div style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                }}>
                    {/* Abstract overlapping glass cards as a visual element instead of the flat image */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '500px',
                        aspectRatio: '1',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            right: '10%',
                            width: '60%',
                            height: '60%',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '30px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transform: 'rotate(10deg)',
                            zIndex: 1
                        }}></div>
                        
                         <div style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '10%',
                            width: '70%',
                            height: '70%',
                            background: 'linear-gradient(135deg, #1c1c1e 0%, #000 100%)',
                            borderRadius: '32px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            zIndex: 2,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                             <img 
                                src="/namo_logo.svg" 
                                alt="Namo Brand" 
                                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(HomeComponent)