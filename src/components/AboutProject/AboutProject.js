function AboutProject() {

    return (
      <section className="aboutProject">
          <h2 className={'section__header'}>О проекте</h2>
          <ul className={'aboutProject__table'}>
              <li className={'aboutProject__table__items'}>
                  <h3 className={'aboutProject__table__title'}>Дипломный проект включал 5 этапов</h3>
                  <p className={'aboutProject__table__text'}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              </li>
              <li className={'aboutProject__table__items'}>
                  <h3 className={'aboutProject__table__title'}>На выполнение диплома ушло 5 недель</h3>
                  <p className={'aboutProject__table__text'}> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </li>
          </ul>
          <ul className={'aboutProject__table_progress'}>
                  <p className={'aboutProject__table__text_progress aboutProject__table__text_progress_green'}>1 неделя</p>
                  <p className={'aboutProject__table__text_progress aboutProject__table__text_progress_white'}>4 недели</p>
                  <p className={'aboutProject__table__text_progress'}>Back-end</p>
                  <p className={'aboutProject__table__text_progress'}> Front-end</p>
          </ul>
      </section>
    );
  }
  
  export default AboutProject;