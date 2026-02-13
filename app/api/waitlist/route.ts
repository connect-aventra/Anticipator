import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, 'waitlist.json');

        // Ensure directory exists
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        let waitlist = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            try {
                waitlist = JSON.parse(fileContent);
            } catch (e) {
                // If file is corrupted or empty, start fresh
                waitlist = [];
            }
        }

        // Check for duplicates
        if (waitlist.some((entry: any) => entry.email === email)) {
            return NextResponse.json({ message: 'Email already on waitlist' }, { status: 409 });
        }

        // Add new entry
        const newEntry = {
            email,
            timestamp: new Date().toISOString(),
        };
        waitlist.push(newEntry);

        // Save to file
        fs.writeFileSync(filePath, JSON.stringify(waitlist, null, 2));

        return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 200 });

    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
