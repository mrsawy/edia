import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

// if (!MONGO_URI) {
//     throw new Error('Please define the MONGODB_URI environment variable');
// }// Extend global type to allow caching
// declare global {
//     // eslint-disable-next-line no-var
//     var __mongoose: {
//         conn: typeof mongoose | null;
//         promise: Promise<typeof mongoose> | null;
//     } | undefined;
// }


// // Global cache (works with hot reload in dev)
// let cached = global.__mongoose;

// if (!cached) {
//     cached = global.__mongoose = { conn: null, promise: null };
// }

export async function dbConnect() {
    // if (!cached) throw new Error();

    // if (cached.conn) return cached.conn;

    // if (!cached.promise) {
    //     if (mongoose.connection.readyState !== 0) {
    //         await mongoose.connection.close();
    //         console.log('🔌 Mongoose disconnected');
    //     }
    //     cached.promise = mongoose.connect(MONGO_URI, {
    //         bufferCommands: false,
    //     });
    // }

    // cached.conn = await cached.promise;
    // return cached.conn;
    return await mongoose.connect(MONGO_URI, {
        bufferCommands: false,
    });
}
