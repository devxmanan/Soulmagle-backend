import { User } from "../models/user.model.js";

// Function to calculate cosine similarity
function cosineSimilarity(vectorA, vectorB) {
    const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export async function findSimilarUsers(userID, remainingUsers) {
    const user1 = await User.findById(userID.userId);
    var similarities = []
    for (const user of remainingUsers) {
        const u = await User.findById(user.userId);
        const similarity = {
            userId: u._id,
            similarity: cosineSimilarity(user1.interests, u.interests)
        };
        similarities.push(similarity);
    };

    const sortedSimilarities = similarities.sort((a, b) => a.similarity - b.similarity);
    return sortedSimilarities[0];
}
