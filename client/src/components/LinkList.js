import React from 'react'
import {Link} from 'react-router-dom'
export const LinkList=({links})=>{
    if(!links.length){
        return <p>Ссылок пока нет</p>
    }
    return (
        <div>
            <table>
            <thead>
                <tr>
                    <td>Ваша ссылка</td>
                    <td>Откуда</td>
                    <td>Количество кликов по ссылке</td>
                    <td>Дата создания</td>
                </tr>
            </thead>
            <tbody>
                { links.map(link => {
                return(
                        <tr key={link._id}>
                        <td><a href={link.to} target='_blank' rel='noopener noreferrer'>{link.to}</a></td>
                        <td><a href={link.from} target='_blank' rel='noopener noreferrer'>{link.from}</a></td>
                        <td>{link.clicks}</td>
                        <td>{new Date(link.date).toLocaleDateString()}</td>
                        <td><Link to={`/detail/${link._id}`}>открыть</Link></td>
                        </tr>
                    )})}
            </tbody>
            </table>
            
        </div>
    )
}