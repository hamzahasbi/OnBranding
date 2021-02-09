const mongoose = require('mongoose');

// {
//   twitter: {
//     type: String
//   },
//   kattis: {
//     type: String
//   },
//   github: {
//     type: String
//   },
//   coffee: {
//     type: String
//   },
//   dev: {
//     type: String
//   },
//   medium: {
//     type: String
//   },
//   codeforeces: {
//     type: String
//   },
//   other: {
//     type: [String]
//   }
// }
const ProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true
    },
    status: {
      type: String,
      required: true
    },
    bio: {
      type: String,
      required: true
    },
    interest: {
      type: String,
      required: true
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill',
        required: true
      }
    ],
    location: {
      type: String,
      required: false
    },
    company: {
      type: String
    },
    websites: [String],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
      }
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }
    ],
    profiltags: {
      type: [String]
    },
    resume: {
      type: String
    },
    education: {
      type: [String],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = {
  Profile: mongoose.model('profile', ProfileSchema)
};
