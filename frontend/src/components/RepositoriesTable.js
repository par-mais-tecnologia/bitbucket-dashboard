import React from 'react'
import styled from 'styled-components'
import Table from './Table'
import { getTimeFromNow } from '../core/utils'

const approveIcon = <img alt='approved' width='18' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOKSURBVGhD7VpbTxNBFObZu/H2pzRe0IgSTXzASPUPGAmaIMqfMGpaiJcHeRBLMLHQUna2bgqJgegLBO1u8RJF33E9Z3r2gfbMdi+zWx/2S76EtDvnfF/ndmaWvgwZMqSHarN63GyaFwzHHDds86VhiwXhmJakLeblZ/CdcMR5fJaa/R9Y3lg+BCJvgej3wL8g2g1C+axtCmyLMShc+pAGHDEBYv5wQsMQeuo39lTqhsDAVfglv3GiYtE2t5Zsc5DSJIfF74v7wUSBFaGVolD6WtpHafXC2DJOQII6nzgRWpiT0utB2akfMxzxiUmWKDEn5iYZ8YDDCSbiCpcoDeJqqGWYgYkpLkGqtEWe5ESDXJ24wD1g5NWsslk5nMgSG5WwNEfaZ6A3JtiACTK/VnAffXjCfoeEYf6A5AVDq+yIv2OHYX510j093e+emj6rNAMTfztUr2D9wwVKip6Jk6/OSPqacWo5ktkdYMTkgiTBdhMeR6v32OehLjNIpj+wvA5TxcahysTI4l3cDNk2oG3Hsq2jJFcNPE9wAXQzvzoV2oRHwzH6Sa4auDJwjXUyjglJW9wnuWrAGHzBNtZEtYnRYCYkxTOSqwb0SJlv3Ml3myW3uD7LfsexsKbDBBCOzSRXDQi4zDZuI5q4NjvkXp654hY3upvRZkJS1EmuGkHOHJ4JTwyaeePTM3pNIAMYCTK0bldGOkSpzPiasKOYAAYaWgEm+/yXBXdo7kaHuEuvd5uZTMKEZLDJPs433k00c31uuEMkmplZLyZoAmiLMZKrRpgNUWVmYGaQNXGnosEEMNCGKM/nIUqU+c9l1kw7tZmAEsVsmEdIrj/kDSATREVp5q3ajC4TSFjllkhmd4imuMkF8WPLTC5RE0iYw8Mkszvw8ILXmFwgP7ab0W9C/Ap93IUl7iEXrBs9M7pNSAYpFttBx90tNmAXlhsV7SYgXlP8EAdIXjjgFQwXtBc0GrWLJCsaoDvzXOA0CfP1KcmJDryuhG6tcQlSIWwFcLTdQ3LioYeX2B+1XWJ7aL1WkO8D2aS6iaNAuwkPOMxgWU7+RY8tHq80V/ZS2uSAq5lcDjkRMQgxHaNhDFCadCB3/9Zr6NAVQDvBwDaW5tZP6yCFTx9y44TaDIs5ELTDCeWIz8o2Ti3XUwMc8AYQhJ3DXxf4HJbOEoimfxiAv+VnYgyfCVyKZ8iQQQP6+v4BpJKB5xwx/IoAAAAASUVORK5CYII=' />

const Ahead = styled.span`
  font-weight: 700;
  color: #d75454;
`

const Behind = styled.span`
  font-weight: 700;
  color: #0a8742;
`

const Link = styled.a`
  text-decoration: none;
  color: #ffffff;
  
  &:hover {
    color: #dddddd;
    text-decoration: underline;
  }
`

const getCompare = (compare) => {
  if (typeof compare !== 'undefined' && compare.length > 0) {
    if (compare[0].ahead === 0 && compare[0].behind === 0) {
      return approveIcon
    } else {
      return (
        <>
          <Link href={compare[0].links.html.href} target='_blank'><Behind>{compare[0].behind}</Behind> ~ <Ahead>{compare[0].ahead}</Ahead></Link>
        </>
      )
    }
  } else {
    return approveIcon
  }
}

const RepositoriesTable = ({ data }) => {
  return (
    <Table shadow>
      <thead>
        <tr>
          <th>Repository</th>
          <th>Version</th>
          <th>Release</th>
          <th>Updated</th>
          <th>Master x Develop</th>
        </tr>
      </thead>
      <tbody>
        {data.map((repo, index) => (
          <tr key={index}>
            <td><Link href={repo.links.html.href} target='_blank'>{repo.name}</Link></td>
            <td>{repo.tags && repo.tags.length > 0 ? <Link href={repo.tags[0].links.html.href} target='_blank'>{repo.tags[0].name}</Link> : '-'}</td>
            <td>{repo.tags && repo.tags.length > 0 ? getTimeFromNow(repo.tags[0].date) : '-'}</td>
            <td>{getTimeFromNow(repo.updated_on)}</td>
            <td>{getCompare(repo.compare)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default RepositoriesTable