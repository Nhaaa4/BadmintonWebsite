// User accounts data structure
const accounts = [
    {
      id: 1,
      name: "John Doe",
      email: "user@example.com",
      password: "password123", // In a real app, this would be hashed
      role: "user",
      isActive: true,
      lastLogin: "2025-03-29T10:15:30Z",
      createdAt: "2023-01-15T08:30:00Z",
    },
    {
      id: 2,
      name: "Panha Sovan",
      email: "panhasovan51@gmail.com",
      password: "12345678", // In a real app, this would be hashed
      role: "user",
      isActive: true,
      lastLogin: "2025-03-28T14:20:15Z",
      createdAt: "2022-11-05T09:45:00Z",
    },
  ]
  
  // Export the accounts data
  export { accounts }
  
  // Helper functions
  export function getAccountByEmail(email) {
    return accounts.find((account) => account.email === email) || null
  }
  
  export function getAccountById(id) {
    return accounts.find((account) => account.id === id) || null
  }
  
  export function authenticateUser(email, password) {
    const account = getAccountByEmail(email)
    if (account && account.password === password) {
      // Update last login time
      account.lastLogin = new Date().toISOString()
      return {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
      }
    }
    return null
  }
  
  export function createAccount(userData) {
    // Check if email already exists
    if (accounts.some((account) => account.email === userData.email)) {
      return { success: false, message: "Email already exists" }
    }

    const name = userData.name || "New User"

    // Create new account
    const newAccount = {
      id: accounts.length > 0 ? Math.max(...accounts.map((a) => a.id)) + 1 : 1,
      name: name,
      email: userData.email,
      password: userData.password, // In a real app, this would be hashed
      role: "user",
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
  
    accounts.push(newAccount)
  
    return {
      success: true,
      account: {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
      },
    }
  }
  
  export function updateAccount(id, updates) {
    const accountIndex = accounts.findIndex((account) => account.id === id)
  
    if (accountIndex === -1) {
      return { success: false, message: "Account not found" }
    }
  
    // Update account fields (except id and role)
    const updatedAccount = {
      ...accounts[accountIndex],
      ...updates,
      id: accounts[accountIndex].id, // Ensure id cannot be changed
      role: accounts[accountIndex].role, // Ensure role cannot be changed
    }
  
    accounts[accountIndex] = updatedAccount
  
    return {
      success: true,
      account: {
        id: updatedAccount.id,
        name: updatedAccount.name,
        email: updatedAccount.email,
        role: updatedAccount.role,
      },
    }
  }
  
  