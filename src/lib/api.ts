interface VerificationResponse {
  chancesOfBeingFake: string;
  verdict: string;
  why: string;
}

export async function verifyProfile(imageBase64: string): Promise<VerificationResponse> {
  try {
    const response = await fetch('https://fake-social-media-detector-backend.vercel.app/verify-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_base64: imageBase64
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying profile:', error);
    throw error;
  }
} 