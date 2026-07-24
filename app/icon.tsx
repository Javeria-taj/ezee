import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function Icon() {
  const logo = fs.readFileSync(path.join(process.cwd(), 'public', 'logo.png'))
  const logoBase64 = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '22%',
        }}
      >
        <img
          src={logoBase64}
          alt="Ezee Logo"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
