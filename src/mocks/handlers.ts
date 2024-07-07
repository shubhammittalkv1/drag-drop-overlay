import { http, HttpResponse } from 'msw';

export const handlers = [
    // Intercept "GET" requests...
    http.get('/api/get-static-data', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json({
            data: [
                {
                    "type": "bank-draft",
                    "title": "Bank Draft",
                    "thumbnailImageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/h_200,w_300/v1720259501/zania-assignment/image-5_j1sf1p.jpg",
                    "imageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/v1720259501/zania-assignment/image-5_j1sf1p.jpg",
                    "position": 0
                },
                {
                    "type": "bill-of-lading",
                    "title": "Bill of Lading",
                    "thumbnailImageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/h_200,w_300/v1720259501/zania-assignment/image-3_coe0yy.jpg",
                    "imageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/v1720259501/zania-assignment/image-3_coe0yy.jpg",
                    "position": 1
                },
                {
                    "type": "invoice",
                    "title": "Invoice",
                    "thumbnailImageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/h_200,w_300/v1720259501/zania-assignment/image-4_hahx8e.jpg",
                    "imageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/v1720259501/zania-assignment/image-4_hahx8e.jpg",
                    "position": 2
                },
                {
                    "type": "bank-draft-2",
                    "title": "Bank Draft 2",
                    "thumbnailImageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/h_200,w_300/v1720259500/zania-assignment/image-1_mn2jns.jpg",
                    "imageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/v1720259500/zania-assignment/image-1_mn2jns.jpg",
                    "position": 3
                },
                {
                    "type": "bill-of-lading-2",
                    "title": "Bill of Lading 2",
                    "thumbnailImageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/h_200,w_300/v1720259500/zania-assignment/image-2_wdbqda.jpg",
                    "imageUrl": "https://res.cloudinary.com/dankrz15s/image/upload/v1720259500/zania-assignment/image-2_wdbqda.jpg",
                    "position": 4
                }
            ]
        })
    }),
]