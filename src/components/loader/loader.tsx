import style from './loader.module.css'

export const Loader = () => {
  return (
    <div className={style.container_loader}>
      <p className={style.loader_text}>Загрузка данных</p>
    </div>
  )
}
