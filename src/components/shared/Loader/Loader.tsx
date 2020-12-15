import React, { ReactElement } from 'react'

import styles from './loader.module.sass'

const Loader = ({ size }: { size: string }): ReactElement =>
  <div className={styles['lds-ring']} style={{ width: size, height: size }}><div></div>
    <div></div><div></div><div></div></div>

export default Loader
