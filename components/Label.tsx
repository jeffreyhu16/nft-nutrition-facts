import styled from 'styled-components'
import { useContext } from 'react'
import { NftContext } from '../contexts/NftContext'
import { CheckContext } from '../contexts/CheckContext'
import infoData from '../utils/info-data.json'
import styles from '../styles/Label.module.css'
import Image from 'next/image'

type InfoData = keyof typeof infoData;

type InfoProps = {
  readonly width: string
}

const Info = styled.button<InfoProps>`
  &::before {
    width: ${props => props.width}rem
  }
`;

const Label = () => {

  const nftCtx = useContext(NftContext)!;
  const { collection, logoURL } = nftCtx;

  const checkCtx = useContext(CheckContext)!;
  const { isVerified, isRenounced, nftSource, isRelevant } = checkCtx;

  const checks = [
    isVerified,
    isRenounced,
    nftSource?.metadata,
    nftSource?.media,
    isRelevant
  ];

  let status = '';
  if (checks.includes(undefined)) {
    status = 'incomplete';
  } else {
    status = 'complete';
  }

  const matchMsg = (check: string, condition: boolean | undefined) => {
    switch (condition) {
      case true:
        return infoData[check as InfoData].pass;
      case false:
        return infoData[check as InfoData].fail;
      case undefined:
        return infoData[check as InfoData].incomplete;
    }
  }

  const matchIcon = (condition: boolean | undefined) => {
    switch (condition) {
      case true:
        return '/green-check.svg';
      case false:
        return '/red-cross.svg';
      case undefined:
        return '/white-check.svg';
    }
  }

  const verifyInfo = matchMsg('isVerified', isVerified);
  const renounceInfo = matchMsg('isRenounced', isRenounced);
  const metadataInfo = matchMsg('metadata', nftSource?.metadata.isSecure);
  const mediaInfo = matchMsg('media', nftSource?.media.isSecure);
  const spamInfo = matchMsg('isRelevant', isRelevant)

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>NFT Nutrition Facts</h1>
      <div className={styles.subHeaderGroup}>
        <h2 className={styles.subHeaderText}>{collection}</h2>
        {logoURL && <Image src={logoURL} unoptimized width={36} height={36} />}
      </div>
      <div className={styles.content}>
        <div className={styles.contentCheck}>
          <div className={styles.checkHeadGroup}>
            <h3 className={styles.checkHead}>Contract Verification</h3>
            <Info width='12' className={styles.infoBox} data-msg={verifyInfo}>
              <Image src='/info.png' width={16} height={16} unoptimized />
            </Info>
          </div>
          <Image
            src={matchIcon(isVerified)}
            width={26}
            height={26}
          />
        </div>
        <div className={styles.contentCheck}>
          <div className={styles.checkHeadGroup}>
            <h3 className={styles.checkHead}>Contract Ownership</h3>
            <Info width='13' className={styles.infoBox} data-msg={renounceInfo}>
              <Image src='/info.png' width={16} height={16} unoptimized />
            </Info>
          </div>
          <Image
            src={matchIcon(isRenounced)}
            width={26}
            height={26}
          />
        </div>
        <div className={styles.contentCheck}>
          <div className={styles.checkHeadGroup}>
            <h3 className={styles.checkHead}>Metadata Storage</h3>
            <Info width='12.5' className={styles.infoBox} data-msg={metadataInfo}>
              <Image src='/info.png' width={16} height={16} unoptimized />
            </Info>
          </div>
          <Image
            src={matchIcon(nftSource?.metadata.isSecure)}
            width={26}
            height={26}
          />
        </div>
        <div className={styles.contentCheck}>
          <div className={styles.checkHeadGroup}>
            <h3 className={styles.checkHead}>Media Storage</h3>
            <Info width='12.5' className={styles.infoBox} data-msg={mediaInfo}>
              <Image src='/info.png' width={16} height={16} unoptimized />
            </Info>
          </div>
          <Image
            src={matchIcon(nftSource?.media.isSecure)}
            width={26}
            height={26}
          />
        </div>
        <div className={styles.contentCheck}>
          <div className={styles.checkHeadGroup}>
            <h3 className={styles.checkHead}>Relevance</h3>
            <Info width='11.5' className={styles.infoBox} data-msg={spamInfo}>
              <Image src='/info.png' width={16} height={16} unoptimized />
            </Info>
          </div>
          <Image
            src={matchIcon(isRelevant)}
            width={26}
            height={26}
          />
        </div>
      </div>
    </div>
  );
}

export default Label;
