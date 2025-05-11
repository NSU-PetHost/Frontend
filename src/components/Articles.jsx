import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    styled,
    keyframes
} from '@mui/material';
import {
    Article as ArticleIcon,
    Favorite,
    Share,
    Bookmark,
    ArrowForward
} from '@mui/icons-material';
import {useThemeContext} from "../contexts/ThemeContext.jsx";
import {useNavigate} from "react-router-dom";

const floatAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
`;

const AnimatedCard = styled(Card)({
    transition: 'all 0.3s ease',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        '& .media': {
            animation: `${floatAnimation} 3s ease infinite`
        }
    }
});

const GradientButton = styled(Button)({
    background: `linear-gradient(45deg, ${({ theme }) => theme.primary.main} 0%, ${({ theme }) => theme.secondary.main} 100%)`,
    color: `${({ theme }) => theme.primary.contrastText}`,
    borderRadius: '50px',
    padding: '12px 32px',
    fontWeight: 'bold',
    fontSize: '1rem',
    boxShadow: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        background: `linear-gradient(45deg, ${({ theme }) => (theme.primary.dark)} 0%, ${({ theme }) => (theme.secondary.dark)} 100%)`
    }
});

export const articles = [
    {
        id: 1,
        title: '10 советов по питанию питомцев',
        excerpt: 'Узнайте, как обеспечить лучший рацион для ваших пушистых друзей',
        image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        content: [
            'Правильное питание - залог здоровья и долголетия вашего питомца. Вот 10 ключевых советов:',
            '1. Выбирайте корм соответственно возрасту: щенки/котята, взрослые и пожилые животные имеют разные потребности.',
            '2. Учитывайте породные особенности - крупные и мелкие породы собак требуют разного подхода.',
            '3. Следите за балансом белков, жиров и углеводов. Для кошек особенно важен животный белок.',
            '4. Не забывайте про витамины и минералы: кальций для костей, таурин для сердца кошек, омега-3 для шерсти.',
            '5. Соблюдайте режим кормления: взрослых животных обычно кормят 2 раза в день в одно время.',
            '6. Контролируйте размер порций. Используйте мерные стаканчики и следите за весом питомца.',
            '7. Обеспечьте постоянный доступ к свежей воде, особенно при кормлении сухим кормом.',
            '8. Вводите новые продукты постепенно, наблюдая за реакцией организма.',
            '9. Избегайте опасных продуктов: шоколад, лук, виноград, ксилит и др.',
            '10. Регулярно консультируйтесь с ветеринаром по вопросам питания.'
        ],
        category: 'Питание',
        readTime: '5 мин'
    },
    {
        id: 2,
        title: 'Эффективное обучение питомца',
        excerpt: 'Современные техники дрессировки без стресса',
        image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        content: [
            'Дрессировка должна быть приятной для вас и вашего питомца. Основные принципы:',
            '1. Начинайте обучение с раннего возраста, но помните - учиться можно в любом возрасте.',
            '2. Используйте положительное подкрепление: лакомства, похвалу, ласку.',
            '3. Тренируйтесь короткими сессиями по 5-10 минут несколько раз в день.',
            '4. Будьте последовательны в командах и ожиданиях.',
            '5. Учитывайте особенности породы - разные собаки имеют разные способности к обучению.',
            '6. Никогда не применяйте физические наказания - это разрушает доверие.',
            '7. Начните с базовых команд: "сидеть", "лежать", "ко мне", "место".',
            '8. Социализируйте питомца - знакомьте с разными людьми, животными и ситуациями.',
            '9. Используйте кликер для точного маркирования желаемого поведения.',
            '10. Будьте терпеливы - каждое животное учится в своем темпе.'
        ],
        category: 'Дрессировка',
        readTime: '8 мин'
    },
    {
        id: 3,
        title: 'Путешествия с питомцами',
        excerpt: 'Все, что нужно знать для комфортных поездок',
        image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        content: [
            'Путешествие с питомцем требует подготовки. Вот ключевые моменты:',
            '1. Заранее уточните правила перевозки животных в транспорте и требования отелей.',
            '2. Приобретите удобную переноску или автомобильное кресло для питомца.',
            '3. Возьмите ветеринарный паспорт с отметками о прививках.',
            '4. Подготовьте аптечку с базовыми медикаментами и средствами от укачивания.',
            '5. Возьмите привычный корм и воду - резкая смена питания может вызвать проблемы.',
            '6. Сделайте питомцу чип или повесьте адресник с контактными данными.',
            '7. Делайте остановки в долгой дороге, чтобы животное могло размяться.',
            '8. В самолете: уточните требования авиакомпании заранее.',
            '9. В поезде: заранее бронируйте места в вагонах, разрешающих перевозку животных.',
            '10. В отеле: уточните, есть ли дополнительные сборы за проживание с питомцем.'
        ],
        category: 'Путешествия',
        readTime: '7 мин'
    },
    {
        id: 4,
        title: 'Основы ухода за питомцем',
        excerpt: 'Полное руководство по поддержанию чистоты и здоровья',
        image: 'https://images.unsplash.com/photo-1594149929911-78975a43d4f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        content: [
            'Регулярный уход - важная часть заботы о питомце. Основные процедуры:',
            '1. Расчесывание: регулярность зависит от типа шерсти (ежедневно для длинношерстных).',
            '2. Купание: не чаще 1 раза в месяц, используя специальные шампуни для животных.',
            '3. Чистка ушей: 1-2 раза в неделю специальным лосьоном и ватными дисками.',
            '4. Уход за глазами: регулярное удаление выделений влажным ватным диском.',
            '5. Стрижка когтей: каждые 2-3 недели, аккуратно, не задевая живую часть.',
            '6. Чистка зубов: специальной пастой и щеткой для животных 2-3 раза в неделю.',
            '7. Уход за кожными складками у пород типа мопсов или шарпеев - ежедневное протирание.',
            '8. Вычесывание подшерстка в период линьки с помощью фурминатора.',
            '9. Регулярная обработка от блох и клещей, особенно в теплый сезон.',
            '10. Профилактический осмотр у ветеринара каждые 6 месяцев.'
        ],
        category: 'Уход',
        readTime: '6 мин'
    },
    {
        id: 5,
        title: 'Чек-лист здоровья питомца',
        excerpt: 'Регулярные проверки здоровья, которые должен знать каждый владелец',
        image: 'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        content: [
            'Регулярный мониторинг здоровья поможет вовремя заметить проблемы. На что обращать внимание:',
            '1. Аппетит и жажда: резкие изменения могут указывать на проблемы.',
            '2. Вес: взвешивайте питомца каждые 2-3 месяца, ожирение опасно для здоровья.',
            '3. Состояние шерсти и кожи: тусклость, перхоть, проплешины - тревожные признаки.',
            '4. Активность: снижение энергии может быть симптомом заболевания.',
            '5. Стул и мочеиспускание: изменения консистенции, цвета или частоты - повод для беспокойства.',
            '6. Состояние глаз: покраснение, помутнение, обильные выделения требуют внимания.',
            '7. Чистота ушей: неприятный запах или выделения могут указывать на инфекцию.',
            '8. Состояние зубов: налет, камень, неприятный запах - признаки проблем.',
            '9. Поведение: нехарактерная агрессия или апатия могут быть симптомами боли.',
            '10. График прививок: своевременно обновляйте вакцинацию по рекомендации ветеринара.'
        ],
        category: 'Здоровье',
        readTime: '10 мин'
    },
    {
        id: 6,
        title: 'Выбор подходящего питомца',
        excerpt: 'Как выбрать идеального компаньона для вашего образа жизни',
        image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        content: [
            'Выбор питомца - ответственное решение. Критерии выбора:',
            '1. Оцените свой образ жизни: активный или спокойный питомец вам подходит?',
            '2. Учитывайте размер жилья: крупным собакам нужно больше пространства.',
            '3. Подумайте о времени: собаки требуют больше внимания, чем кошки.',
            '4. Финансовые возможности: крупные породы и экзотические животные требуют больше затрат.',
            '5. Аллергии: проверьте, нет ли у членов семьи аллергии на шерсть.',
            '6. Дети в семье: некоторые породы лучше ладят с детьми, чем другие.',
            '7. Опыт содержания: новичкам лучше выбирать менее требовательных питомцев.',
            '8. Продолжительность жизни: черепахи живут десятилетиями, грызуны - несколько лет.',
            '9. Возраст: щенки/котята требуют больше времени на воспитание, взрослые животные могут иметь сформированный характер.',
            '10. Рассмотрите вариант взять животное из приюта - многие из них ищут любящий дом.'
        ],
        category: 'Руководство',
        readTime: '9 мин'
    }
];


const Articles = () => {
    const { theme } = useThemeContext();
    const navigate = useNavigate();

    return (
        <Box sx={{
            minHeight: '100vh',
            py: 8
        }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box mb={8} ml={8} sx={{ px: { xs: 2, sm: 4 } }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 800,
                            background: `linear-gradient(45deg, ${theme.primary.main} 0%, ${theme.secondary.main} 80%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        Интересные статьи
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={theme.text.secondary}
                        mx="auto"
                        sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
                    >
                        Откройте для себя последние советы и рекомендации по уходу, дрессировке, питанию и многому другому от наших экспертов.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center">
                    {articles.map((article) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            key={article.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <AnimatedCard sx={{
                                maxWidth: 400,
                                width: '100%',
                                cursor: 'pointer'
                            }} onClick={() => navigate(`/articles/${article.id}`)}>
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={article.image}
                                    alt={article.title}
                                    className="media"
                                    sx={{
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '16px',
                                        borderTopRightRadius: '16px'
                                    }}
                                />
                                <CardContent sx={{
                                    position: 'relative',
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -20,
                                        right: 20,
                                        backgroundColor: theme.secondary.main,
                                        color: 'white',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                    }}>
                                        {article.category}
                                    </Box>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h3"
                                        sx={{
                                            mt: 1,
                                            fontWeight: 600,
                                            fontSize: '1.3rem',
                                            lineHeight: 1.3,
                                            minHeight: '3.5rem',
                                            color: theme.primary.dark
                                        }}
                                    >
                                        {article.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={theme.text.secondary}
                                        sx={{
                                            mb: 2,
                                            flexGrow: 1,
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {article.excerpt}
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mt: 'auto' }}
                                    >
                                        <Typography
                                            variant="caption"
                                            color="text.disabled"
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <ArticleIcon sx={{
                                                fontSize: '1rem',
                                                mr: 0.5,
                                            }} />
                                            Опубликована {article.readTime}
                                        </Typography>
                                        <Box>
                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth: 0,
                                                    color: theme.primary.main,
                                                    '&:hover': {
                                                        color: theme.primary.dark
                                                    }
                                                }}
                                            >
                                                <Favorite fontSize="small" />
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth: 0,
                                                    color: theme.primary.main,
                                                    '&:hover': {
                                                        color: theme.primary.dark
                                                    }
                                                }}
                                            >
                                                <Bookmark fontSize="small" />
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{
                                                    minWidth: 0,
                                                    color: theme.primary.main,
                                                    '&:hover': {
                                                        color: theme.primary.dark
                                                    }
                                                }}
                                            >
                                                <Share fontSize="small" />
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </AnimatedCard>
                        </Grid>
                    ))}
                </Grid>

                <Box textAlign="center" mt={8}>
                    <GradientButton
                        endIcon={<ArrowForward sx={{ ml: 0.5 }} />}
                        size="large"
                    >
                        Все статьи
                    </GradientButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Articles;