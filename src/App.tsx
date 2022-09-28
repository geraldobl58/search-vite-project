import { useState, useEffect } from "react";

import { 
  Box, 
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import axios from 'axios'

type RepoProps = {
  name: string
  description: string
}

export function App() {
  const [repos, setRepos] = useState<RepoProps[]>([])

  const [search, setSearch] = useState('')

  useEffect(() => {
    async function getAllRepos() {
      const response = await axios.get(`https://api.github.com/users/geraldobl58/repos`)
      setRepos(response.data)
    }
    getAllRepos()
  }, [])

  const filteredRepos = search.length > 0
    ? repos.filter(repo => repo.name.includes(search))
    : []

  return (
    <Box>
       <TextField
        fullWidth
        label="Pesquisar" 
        variant="outlined"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <TableContainer component={Paper} style={{ marginTop: 50 }}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search.length > 0 ? (
              <>
                {filteredRepos.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {repos.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

