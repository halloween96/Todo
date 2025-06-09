
<table>
    <thead>
        <tr>
            <th scope='col' className='w-1/2 py-2 rounded-ss-md'>
                물품
            </th>
            <th scope='col' className='py-2'>
                단가
            </th>
            <th scope='col' className='w-1/12 py-2'>
                수량
            </th>
            <th scope='col' className='py-2 rounded-se-md'>
                가격
            </th>
        </tr>
    </thead>
    <tbody>
        {rd.content.body.items.map((item, idx) =>
            <tr key={`tr${idx}`} onClick={() => handleRowClick(idx)}>
                <td className={tdst}>
                    <input id='item'
                        type='text' defaultValue={item.item} ref={el => setItemRef(idx, el)} />
                </td>
                <td className={tdst}>
                    <input id='unitPrice' type='text' defaultValue={parseInt(item.unitPrice).toLocaleString('ko-KR')}
                        ref={el => setUnitPriceRef(idx, el)} onChange={(e) => numberInput(e, idx, 'unitPrice')} onBlur={formatNumber} />
                </td>
                <td className={tdst}>
                    <input id='quantity' type='text' defaultValue={item.quantity}
                        ref={el => setQuantityRef(idx, el)} onChange={(e) => numberInput(e, idx, 'quantity')} />
                </td>
                <td className={tdst}>
                    <input id='price' type='text' defaultValue={parseInt(item.price).toLocaleString('ko-KR')}
                        ref={el => setPriceRef(idx, el)} readOnly />
                </td>
            </tr>
        )}
    </tbody>
</table>
