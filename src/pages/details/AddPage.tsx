import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { EmptyPage } from '../util'
import { Input, Text, Button } from '../../components'
import { useEnv } from '../../context/EnvContext'
import { categoryList } from '../../constants/Category'
import { IsSDevice } from '../../util/responsive'
import { theme } from '../../constants/Color'

const AddPage = () => {
  const env = useEnv();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const titlePlaceholder = '제목을 입력해주세요';
  const [description, setDescription] = useState('');
  const descriptionPlaceholder = '설명을 입력해주세요';
  const [brand, setBrand] = useState('');
  const brandPlaceholder = '브랜드를 입력해주세요 (선택사항)';
  const [category, setCategory] = useState();
  const [contact, setContact] = useState('');
  const contactPlaceholder = '연락처를 입력해주세요';
  const [effectiveDate, setEffectiveDate] = useState();
  const effectiveDatePlaceholder = '발효일자를 입력해주세요';
  const [expirationDate, setExpirationDate] = useState();
  const expirationDatePlaceholder = '만료일자를 입력해주세요';
  const [image, setImage] = useState('');
  const imagePlaceholder = "이미지를 업로드해주세요.";

  const [sliced, setSliced] = useState<any>();
  const unit = IsSDevice() ? 7 : 3;
  const iconSize = 24;
  const itemSize = 64;

  const margin = 8;

  const styles = {
    container: {
      margin: margin*2,
    },
    header: {
      fontFamily: 'one_main_light',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: margin*2,
    },
    category: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      marginBottom: margin*2,
    },
    categoryRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: itemSize,
      height: itemSize,
      justifyContent: 'center',
      alignItems: 'center',
      textDecoration: 'none',
      color: env.fontColor,
    }, 
    label: {
      fontSize: '0.5rem',
      textAlign: 'center',
      wordBreak: 'keep-all',
      marginTop: margin,
      color: env.fontColor,
    },
    form: {
      alignSelf: 'flex-end',
      marginTop: margin*2,
    }
  } as const

  const sliceArraybyNumber = (arr: any, n: number) => {
    const len = arr.length;
    const slicedArr = [];
    for(var i = 0; i < len; i += n)
      slicedArr.push(arr.slice(i, i + n))
    
    return slicedArr;
  }

  useEffect(() => {
    setSliced(sliceArraybyNumber(categoryList, unit))
  }, [unit])

  return (
    <EmptyPage back>
      <div style={styles.container}>
        <Input type={'text'} inputContainerStyle={styles.input} header={'제목'} headerStyle={styles.header} value={title} onChange={(e: any) => { setTitle(e.currentTarget.value) }} placeholder={titlePlaceholder} />
        <Input type={'text'} inputContainerStyle={styles.input} header={'설명'} headerStyle={styles.header} value={description} onChange={(e: any) => { setDescription(e.currentTarget.value) }} placeholder={descriptionPlaceholder} />
        <Input type={'text'} inputContainerStyle={styles.input} header={'브랜드'} headerStyle={styles.header} value={brand} onChange={(e: any) => { setBrand(e.currentTarget.value) }} placeholder={brandPlaceholder} />

        <Text style={styles.header} value={'카테고리'}/>
        <div style={styles.category}>
          {sliced && sliced.map((categorySet: any, i1: number) => (
            <div key={`category_${i1}`} style={styles.categoryRow}>
              {categorySet.map((item: any, i2: number) => (
                <div
                  key={item._id + i2} 
                  // to={{ pathname: '/search', search: `?category=${item._id}` }}
                  style={styles.item}
                  onClick={() => setCategory(item._id)}
                >
                  <item.icon size={iconSize} color={(item._id === category) ? theme : env.fontColor} />
                  <div style={styles.label}>{item.label}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Input type={'text'} inputContainerStyle={styles.input} header={'연락처'} headerStyle={styles.header} value={contact} onChange={(e: any) => { setContact(e.currentTarget.value) }} placeholder={contactPlaceholder} />
        <Input type={'text'} inputContainerStyle={styles.input} header={'발효일자'} headerStyle={styles.header} value={effectiveDate} onChange={(e: any) => { setEffectiveDate(e.currentTarget.value) }} placeholder={effectiveDatePlaceholder} />
        <Input type={'text'} inputContainerStyle={styles.input} header={'만료일자'} headerStyle={styles.header} value={expirationDate} onChange={(e: any) => { setExpirationDate(e.currentTarget.value) }} placeholder={expirationDatePlaceholder} />
        
        <Input type={'file'} inputContainerStyle={styles.input} accept={"image/*;capture=camera"} header={'이미지'} headerStyle={styles.header} value={image} onChange={(e: any) => { setImage(e.currentTarget.value) }} placeholder={imagePlaceholder} />

        {/* <Input type={'password'} header={'비밀번호'} value={password} onChange={(e: any) => { setPassword(e.currentTarget.value) }} placeholder={pwPlaceholder}/>
        <Input type={'password'} header={'비밀번호 확인'} value={passwordCheck} onChange={(e: any) => { setPasswordCheck(e.currentTarget.value) }} placeholder={pwcPlaceholder}/>
        <div style={styles.rowContentContainer}>
          <div style={styles.line} />
          <Text textStyle={styles.entry} value={'필수'}/>
        </div>

        <Input type={'text'} header={'이름'} value={name} onChange={(e: any) => { setName(e.currentTarget.value) }} placeholder={'이름을 입력해주세요'}/>
        <Input type={'text'} header={'전화번호'} value={phone} onChange={(e: any) => { setPhone(e.currentTarget.value) }} placeholder={'전화번호를 입력해주세요'}/>
        <div style={styles.rowContentContainer}>
          <div style={styles.line} />
          <Text textStyle={styles.entry} value={'선택'}/>
        </div>

        <div style={styles.form}>
          <Button onClick={() => { requestCreateAccount() }} children={'회원가입하기'} />
        </div> */}
        <div style={styles.form}>
          <Button onClick={() => { }} children={'추가하기'} />
        </div>
      </div>
    </EmptyPage>
  )
}

export default AddPage
