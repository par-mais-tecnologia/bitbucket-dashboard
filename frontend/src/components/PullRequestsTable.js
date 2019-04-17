import React from 'react'
import styled from 'styled-components'
import Table from './Table'
import backToWork from './back-to-work.jpg'
import { getTimeFromNow } from '../core/utils'

const getApproval = (obj) => {
  let approved = false

  obj.forEach(act => { 
    if ('approval' in act) {
      approved = true
    }
  })

  return approved
}

const approveIcon = <img alt='approved' width='18' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOKSURBVGhD7VpbTxNBFObZu/H2pzRe0IgSTXzASPUPGAmaIMqfMGpaiJcHeRBLMLHQUna2bgqJgegLBO1u8RJF33E9Z3r2gfbMdi+zWx/2S76EtDvnfF/ndmaWvgwZMqSHarN63GyaFwzHHDds86VhiwXhmJakLeblZ/CdcMR5fJaa/R9Y3lg+BCJvgej3wL8g2g1C+axtCmyLMShc+pAGHDEBYv5wQsMQeuo39lTqhsDAVfglv3GiYtE2t5Zsc5DSJIfF74v7wUSBFaGVolD6WtpHafXC2DJOQII6nzgRWpiT0utB2akfMxzxiUmWKDEn5iYZ8YDDCSbiCpcoDeJqqGWYgYkpLkGqtEWe5ESDXJ24wD1g5NWsslk5nMgSG5WwNEfaZ6A3JtiACTK/VnAffXjCfoeEYf6A5AVDq+yIv2OHYX510j093e+emj6rNAMTfztUr2D9wwVKip6Jk6/OSPqacWo5ktkdYMTkgiTBdhMeR6v32OehLjNIpj+wvA5TxcahysTI4l3cDNk2oG3Hsq2jJFcNPE9wAXQzvzoV2oRHwzH6Sa4auDJwjXUyjglJW9wnuWrAGHzBNtZEtYnRYCYkxTOSqwb0SJlv3Ml3myW3uD7LfsexsKbDBBCOzSRXDQi4zDZuI5q4NjvkXp654hY3upvRZkJS1EmuGkHOHJ4JTwyaeePTM3pNIAMYCTK0bldGOkSpzPiasKOYAAYaWgEm+/yXBXdo7kaHuEuvd5uZTMKEZLDJPs433k00c31uuEMkmplZLyZoAmiLMZKrRpgNUWVmYGaQNXGnosEEMNCGKM/nIUqU+c9l1kw7tZmAEsVsmEdIrj/kDSATREVp5q3ajC4TSFjllkhmd4imuMkF8WPLTC5RE0iYw8Mkszvw8ILXmFwgP7ab0W9C/Ap93IUl7iEXrBs9M7pNSAYpFttBx90tNmAXlhsV7SYgXlP8EAdIXjjgFQwXtBc0GrWLJCsaoDvzXOA0CfP1KcmJDryuhG6tcQlSIWwFcLTdQ3LioYeX2B+1XWJ7aL1WkO8D2aS6iaNAuwkPOMxgWU7+RY8tHq80V/ZS2uSAq5lcDjkRMQgxHaNhDFCadCB3/9Zr6NAVQDvBwDaW5tZP6yCFTx9y44TaDIs5ELTDCeWIz8o2Ti3XUwMc8AYQhJ3DXxf4HJbOEoimfxiAv+VnYgyfCVyKZ8iQQQP6+v4BpJKB5xwx/IoAAAAASUVORK5CYII=' />

const Author = styled.td`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 120px;
`

const Title = styled.td`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 300px;
`

const Link = styled.a`
  text-decoration: none;
  color: #ffffff;
  
  &:hover {
    color: #dddddd;
    text-decoration: underline;
  }
`

const PullRequestsTable = ({ data }) => {
  return data.length === 0 ? (<img src={backToWork} alt="volte ao tlabalho" />) : (
    <Table shadow>
      <thead>
        <tr>
          <th>Repository</th>
          <th>Author</th>
          <th>Title</th>
          <th></th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {data.map((pr, index) => (
          <tr key={index}>
            <td><Link href={pr.destination.repository.links.html.href} target='_blank'>{pr.source.repository.name}</Link></td>
            <Author>{pr.author.display_name}</Author>
            <Title><Link href={pr.links.html.href} target='_blank'>{pr.title}{pr.description.replace(/\*/, ':')}</Link></Title>
            <td>{getApproval(pr.activity) && approveIcon}</td>
            <td>{getTimeFromNow(pr.created_on)}</td>
            <td>{getTimeFromNow(pr.updated_on)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default PullRequestsTable