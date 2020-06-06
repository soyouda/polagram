export const USER_FRAGMENT = `
    fragment UserParts on User{
        id 
        name
        email
        firstName
        lastName
        following { 
            
            caption
        }
    }
    
  `;
