import React from 'react';




export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:'5vw'
        }}>
            <fieldset
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid rgb(216 209 209)',
                    width: '50vw',
                    borderRadius: '1.5vw'
                }}
            >
                <legend style={{
                    fontWeight: '100',
                }}>
                    Register
                </legend>
                <div style={{
                    width:'90%',
                    margin:'1vh',
                    // display:'flex',
                    // flexDirection:'column',
                    // gap:'1vh'
                    // marginTop:'2vw'
                }}>
                    {children}
                </div>
            </fieldset>
        </div>
    );
}
