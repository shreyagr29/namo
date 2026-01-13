import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Button, Card, CardContent } from '@mui/material';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (err) {
                console.log(err);
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    return (
        <div style={{
            height: '100vh',
            overflow: 'auto',
            background: '#0F0F11',
            color: 'white',
            padding: '40px 20px',
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '40px',
                    position: 'relative'
                }}>
                    <IconButton 
                        onClick={() => routeTo("/home")} 
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            color: 'white',
                            marginRight: '20px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <HomeIcon />
                    </IconButton>
                    <div>
                        <Typography variant="h4" style={{ fontWeight: 700, fontSize: '2rem' }}>
                            Meeting History
                        </Typography>
                        <Typography variant="body1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Reconnect with your recent conversations
                        </Typography>
                    </div>
                </div>

                {/* Grid of Cards */}
                <div style={{ display: 'grid', gap: '16px' }}>
                    {(meetings.length !== 0 && Array.isArray(meetings)) ? meetings.map((e, i) => {
                        return (
                            <div 
                                key={i} 
                                style={{
                                    background: 'rgba(28, 28, 30, 0.5)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(28, 28, 30, 0.5)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        background: 'rgba(10, 132, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <VideoCallIcon style={{ color: '#0A84FF' }} />
                                    </div>
                                    
                                    <div>
                                        <Typography style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>
                                            {e.meetingCode}
                                        </Typography>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <CalendarTodayIcon style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }} />
                                            <Typography style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
                                                {formatDate(e.date)}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                <Button 
                                    variant="outlined" 
                                    endIcon={<ArrowForwardIosIcon style={{ fontSize: '0.8rem' }} />}
                                    sx={{
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.7)',
                                        textTransform: 'none',
                                        borderRadius: '12px',
                                        '&:hover': {
                                            borderColor: '#0A84FF',
                                            color: '#0A84FF',
                                            background: 'rgba(10, 132, 255, 0.05)'
                                        }
                                    }}
                                    onClick={() => routeTo(`/${e.meetingCode}`)}
                                >
                                    Rejoin
                                </Button>
                            </div>
                        )
                    }) : (
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '60px', 
                            background: 'rgba(255,255,255,0.02)', 
                            borderRadius: '24px',
                            border: '1px dashed rgba(255,255,255,0.1)'
                        }}>
                             <Typography style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
                                No meeting history found
                            </Typography>
                            <Button onClick={() => routeTo("/home")} sx={{ color: '#0A84FF' }}>
                                Start a new meeting
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}